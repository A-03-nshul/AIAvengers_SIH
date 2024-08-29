# traffic_signal.py
import time

class TrafficSignal:
    def __init__(self):
        self.green_time = 30  # Default green time in seconds
        self.red_time = 30    # Default red time in seconds

    def adjust_timing(self, vehicle_count):
        if vehicle_count > 10:  # Threshold for busy traffic
            self.green_time += 10  # Extend green time
        elif vehicle_count < 5:  # Threshold for light traffic
            self.green_time = max(10, self.green_time - 10)  # Reduce green time but keep it above 10 seconds

    def run_signal(self):
        print(f"Green light for {self.green_time} seconds")
        time.sleep(self.green_time)  # Simulate green light duration
        print("Red light for 30 seconds")
        time.sleep(self.red_time)  # Simulate red light duration