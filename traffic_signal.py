# traffic_signal.py
class TrafficSignal:
    def __init__(self):
        self.state = "RED"  # Initial state
        self.green_time = 30  # Default green light duration
        self.yellow_time = 5  # Default yellow light duration
        self.red_time = 30    # Default red light duration

    def adjust_timing(self, vehicle_count):
        if vehicle_count > 8:  # Busy traffic
            self.state = "GREEN"
            self.green_time = 30  # Keep green for longer
        elif vehicle_count < 4:  # Light traffic
            self.state = "RED"
            self.green_time = 10  # Shorter green time
        else:
            self.state = "YELLOW"  # Transition state
            self.green_time = 5  # Short yellow light

    def get_signal_state(self):
        return self.state