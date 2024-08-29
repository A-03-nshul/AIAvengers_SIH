# traffic_simulation.py
import cv2

# Define colors
RED = (0, 0, 255)      # Red color in BGR
YELLOW = (0, 255, 255) # Yellow color in BGR
GREEN = (0, 255, 0)    # Green color in BGR
GRAY = (100, 100, 100) # Gray color for inactive lights

def run_simulation(frame, vehicle_count, signal):
    # Draw the signal box
    cv2.rectangle(frame, (150, 50), (250, 300), (0, 0, 0), -1)  # Black box for the signal

    # Draw the lights
    radius = 20
    # Red light
    if signal.state == "RED":
        cv2.circle(frame, (200, 100), radius, RED, -1)  # Red light on
    else:
        cv2.circle(frame, (200, 100), radius, GRAY, -1)  # Red light off

    # Yellow light
    if signal.state == "YELLOW":
        cv2.circle(frame, (200, 150), radius, YELLOW, -1)  # Yellow light on
    else:
        cv2.circle(frame, (200, 150), radius, GRAY, -1)  # Yellow light off

    # Green light
    if signal.state == "GREEN":
        cv2.circle(frame, (200, 200), radius, GREEN, -1)  # Green light on
    else:
        cv2.circle(frame, (200, 200), radius, GRAY, -1)  # Green light off

    # Display the number of detected vehicles
    cv2.putText(frame, f"Detected Vehicles: {vehicle_count}", (50, 350), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

    return frame
