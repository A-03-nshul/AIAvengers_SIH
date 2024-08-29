# main.py
import cv2
from vehicle_detection import VehicleDetector
from traffic_signal import TrafficSignal

def main():
    # Initialize vehicle detector
    detector = VehicleDetector("weights/yolov3.weights", "weights/yolov3.cfg")
    signal = TrafficSignal()

    # Load image
    frame = cv2.imread("traffic.jpg")  # Replace with your image path
    # Check if the image was loaded successfully
    if frame is None:
        print("Error: Could not open or find the image.")
        return  # Exit the program or handle the error accordingly

    # Detect vehicles
    vehicle_count = detector.detect_vehicles(frame)
    print(f"Detected vehicles: {vehicle_count}")

    # Adjust traffic signal timing based on vehicle count
    signal.adjust_timing(vehicle_count)

    # Run the traffic signal
    signal.run_signal()

    # Display the image
    cv2.imshow("Traffic Image", frame)
    cv2.waitKey(0)  # Wait for a key press
    cv2.destroyAllWindows()  # Close all OpenCV windows

if __name__ == "__main__":
    main()

