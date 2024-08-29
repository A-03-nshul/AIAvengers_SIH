# main.py
from vehicle_detection import VehicleDetector

def main():
    # Initialize vehicle detector
    detector = VehicleDetector("weights/yolov3.weights", "weights/yolov3.cfg")  # Update with your paths

    # Process the video
    detector.process_video("Traffic1.mp4")  # Replace with your actual video path

if __name__ == "__main__":
    main()
