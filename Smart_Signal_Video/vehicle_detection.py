# vehicle_detection.py
import cv2
import numpy as np
from traffic_signal import TrafficSignal
from traffic_simulation import run_simulation

class VehicleDetector:
    def __init__(self, weights_path, config_path):
        self.net = cv2.dnn.readNet(weights_path, config_path)
        self.layer_names = self.net.getLayerNames()
        
        # Get unconnected output layers
        out_layers = self.net.getUnconnectedOutLayers()
        
        # Ensure out_layers is a list
        if isinstance(out_layers, np.ndarray):
            out_layers = out_layers.flatten()  # Flatten the array if it's a 1D array
        
        self.output_layers = [self.layer_names[i - 1] for i in out_layers]  # Adjust index for Python (0-based)
        
        # Load COCO class labels
        self.classes = []
        with open("coco.names", "r") as f:  # Ensure you have a coco.names file with class names
            self.classes = [line.strip() for line in f.readlines()]

        # Initialize traffic signal
        self.signal = TrafficSignal()

    def detect_vehicles(self, frame):
        height, width, _ = frame.shape
        blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
        self.net.setInput(blob)
        outputs = self.net.forward(self.output_layers)

        class_ids = []
        confidences = []
        boxes = []

        for output in outputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.5:  # Confidence threshold
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    # Rectangle coordinates
                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)

        # Non-max suppression
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

        vehicle_count = 0
        for i in range(len(boxes)):
            if i in indexes:
                vehicle_count += 1  # Count detected vehicles
                x, y, w, h = boxes[i]
                label = str(self.classes[class_ids[i]])
                confidence_text = f"{label}: {confidences[i]:.2f}"

                # Draw bounding box and label
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 1)  # Thinner boxes
                cv2.putText(frame, confidence_text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Adjust the traffic signal based on the vehicle count
        self.signal.adjust_timing(vehicle_count)
        print(f"Current Signal State: {self.signal.get_signal_state()}")  # Output the signal state

        # Run the traffic signal simulation on the frame
        frame = run_simulation(frame, vehicle_count, self.signal)

        return frame

    def process_video(self, video_path):
        # Open the video file
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print("Error: Could not open video.")
            return

        # Get the original frame rate of the video
        fps = cap.get(cv2.CAP_PROP_FPS)
        wait_time = int(1000 / fps)  # Calculate wait time in milliseconds

        while True:
            ret, frame = cap.read()
            if not ret:
                print("End of video or error reading the video.")
                break

            # Detect vehicles and run the simulation in the current frame
            frame = self.detect_vehicles(frame)

            # Display the frame with detections and simulation
            cv2.imshow("Video", frame)

            # Break the loop on 'q' key press
            if cv2.waitKey(wait_time) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
