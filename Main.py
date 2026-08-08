from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import datetime

# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIR = BASE_DIR / "frontend"


# ==========================================
# FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="AI Portable Safety Camp",
    description="Real-time disaster safety monitoring system",
    version="1.0.0"
)


# ==========================================
# STATIC FILES
# ==========================================

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)


# ==========================================
# HOME PAGE
# ==========================================

@app.get("/")
async def home():

    return FileResponse(
        FRONTEND_DIR / "index.html"
    )


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/api/health")
async def health():

    return {
        "status": "online",
        "system": "AI Portable Safety Camp",
        "backend": "FastAPI"
    }


# ==========================================
# SENSOR DATA MODEL
# ==========================================

class SensorData(BaseModel):

    temperature: float
    humidity: float
    smoke: float
    gas: float
    water: float
    solar: float
    battery: float

    timestamp: float | None = None


# ==========================================
# LATEST SENSOR DATA
# ==========================================

latest_sensor_data = {

    "temperature": 25.0,
    "humidity": 55.0,
    "smoke": 80.0,
    "gas": 120.0,
    "water": 75.0,
    "solar": 650.0,
    "battery": 85.0,

    "timestamp": None
}


# ==========================================
# RECEIVE SENSOR DATA
# ==========================================

@app.post("/api/sensors")
async def receive_sensor_data(
    data: SensorData
):

    global latest_sensor_data

    latest_sensor_data = {

        "temperature": data.temperature,
        "humidity": data.humidity,
        "smoke": data.smoke,
        "gas": data.gas,
        "water": data.water,
        "solar": data.solar,
        "battery": data.battery,

        "timestamp":
            data.timestamp
            if data.timestamp
            else datetime.now().timestamp()
    }

    return {

        "status": "received",

        "message":
            "Sensor data received successfully",

        "data":
            latest_sensor_data
    }


# ==========================================
# GET LATEST SENSOR DATA
# ==========================================

@app.get("/api/sensors")
async def get_sensor_data():

    return {

        "status": "success",

        "data":
            latest_sensor_data
    }
