import random
import time
import requests


# ==========================================
# FASTAPI SERVER
# ==========================================

API_URL = "http://127.0.0.1:8000/api/sensors"


# ==========================================
# VIRTUAL ESP32
# ==========================================

class SensorSimulator:

    def __init__(self):

        self.temperature = 25.0
        self.humidity = 55.0
        self.smoke = 80.0
        self.gas = 120.0
        self.water = 75.0
        self.solar = 650.0
        self.battery = 85.0


    # ======================================
    # GENERATE SENSOR READING
    # ======================================

    def generate_reading(self):

        # Temperature
        self.temperature += random.uniform(
            -0.5,
            0.5
        )

        self.temperature = max(
            18,
            min(
                45,
                self.temperature
            )
        )


        # Humidity
        self.humidity += random.uniform(
            -1.2,
            1.2
        )

        self.humidity = max(
            30,
            min(
                90,
                self.humidity
            )
        )


        # Smoke
        self.smoke += random.uniform(
            -8,
            8
        )

        self.smoke = max(
            20,
            min(
                500,
                self.smoke
            )
        )


        # Gas
        self.gas += random.uniform(
            -10,
            10
        )

        self.gas = max(
            30,
            min(
                600,
                self.gas
            )
        )


        # Water
        self.water -= random.uniform(
            0.05,
            0.25
        )

        if self.water < 10:

            self.water = 100


        # Solar
        self.solar += random.uniform(
            -25,
            25
        )

        self.solar = max(
            0,
            min(
                1000,
                self.solar
            )
        )


        # Battery
        if self.solar > 400:

            self.battery += random.uniform(
                0,
                0.12
            )

        else:

            self.battery -= random.uniform(
                0.02,
                0.08
            )


        self.battery = max(
            0,
            min(
                100,
                self.battery
            )
        )


        return {

            "temperature":
                round(
                    self.temperature,
                    1
                ),

            "humidity":
                round(
                    self.humidity,
                    1
                ),

            "smoke":
                round(
                    self.smoke,
                    1
                ),

            "gas":
                round(
                    self.gas,
                    1
                ),

            "water":
                round(
                    self.water,
                    1
                ),

            "solar":
                round(
                    self.solar,
                    1
                ),

            "battery":
                round(
                    self.battery,
                    1
                ),

            "timestamp":
                time.time()
        }


# ==========================================
# SEND DATA TO FASTAPI
# ==========================================

def send_to_backend(data):

    try:

        response = requests.post(
            API_URL,
            json=data,
            timeout=3
        )

        if response.status_code == 200:

            print(
                "✓ Sensor data sent successfully"
            )

            print(
                data
            )

        else:

            print(
                "⚠ Backend returned:",
                response.status_code
            )


    except requests.exceptions.ConnectionError:

        print(
            "✗ Cannot connect to FastAPI."
        )

        print(
            "  Make sure the backend is running."
        )


    except requests.exceptions.RequestException as error:

        print(
            "✗ Request error:",
            error
        )


# ==========================================
# MAIN
# ==========================================

if __name__ == "__main__":

    simulator = SensorSimulator()


    print()
    print(
        "=========================================="
    )

    print(
        "   AI PORTABLE SAFETY CAMP"
    )

    print(
        "   VIRTUAL ESP32 SENSOR SYSTEM"
    )

    print(
        "=========================================="
    )

    print()

    print(
        "Backend:",
        API_URL
    )

    print()

    print(
        "Starting sensor transmission..."
    )

    print(
        "Press CTRL+C to stop."
    )

    print()


    while True:

        sensor_data = (
            simulator.generate_reading()
        )


        send_to_backend(
            sensor_data
        )


        time.sleep(2)
