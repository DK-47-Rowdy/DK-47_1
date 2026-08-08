/* ============================================================
   AI PORTABLE SAFETY CAMP
   DASHBOARD CONTROLLER
   ============================================================ */


let gauges = {};


/* ============================================================
   INITIALIZE GAUGES
   ============================================================ */

function initializeGauges() {


    gauges.temperature =
        new TechnicalGauge(
            "temperatureGauge",
            {
                label: "Temperature",
                unit: "°C",
                min: 0,
                max: 60,
                value: 25,
                color: "#FF4444",
                warning: 65,
                danger: 82,
                decimals: 1,
                animationSpeed: 0.035,
                size: 270
            }
        );


    gauges.humidity =
        new TechnicalGauge(
            "humidityGauge",
            {
                label: "Humidity",
                unit: "%",
                min: 0,
                max: 100,
                value: 55,
                color: "#00E5FF",
                warning: 70,
                danger: 85,
                decimals: 1,
                animationSpeed: 0.035,
                size: 270
            }
        );


    gauges.smoke =
        new TechnicalGauge(
            "smokeGauge",
            {
                label: "Smoke Density",
                unit: "PPM",
                min: 0,
                max: 1000,
                value: 80,
                color: "#FF9800",
                warning: 55,
                danger: 80,
                decimals: 0,
                animationSpeed: 0.032,
                size: 270
            }
        );


    gauges.gas =
        new TechnicalGauge(
            "gasGauge",
            {
                label: "Gas Level",
                unit: "PPM",
                min: 0,
                max: 1000,
                value: 120,
                color: "#FFD740",
                warning: 55,
                danger: 80,
                decimals: 0,
                animationSpeed: 0.032,
                size: 270
            }
        );


    gauges.water =
        new TechnicalGauge(
            "waterGauge",
            {
                label: "Water Level",
                unit: "%",
                min: 0,
                max: 100,
                value: 75,
                color: "#2196F3",
                warning: 25,
                danger: 10,
                decimals: 1,
                animationSpeed: 0.035,
                size: 270
            }
        );


    gauges.solar =
        new TechnicalGauge(
            "solarGauge",
            {
                label: "Solar Output",
                unit: "W",
                min: 0,
                max: 1000,
                value: 650,
                color: "#00E676",
                warning: 20,
                danger: 10,
                decimals: 0,
                animationSpeed: 0.03,
                size: 270
            }
        );


    gauges.battery =
        new TechnicalGauge(
            "batteryGauge",
            {
                label: "Battery",
                unit: "%",
                min: 0,
                max: 100,
                value: 85,
                color: "#B2FF59",
                warning: 30,
                danger: 15,
                decimals: 1,
                animationSpeed: 0.032,
                size: 270
            }
        );

}


/* ============================================================
   FETCH SENSOR DATA
   ============================================================ */

async function fetchSensorData() {

    try {

        const response =
            await fetch(
                "/api/sensors",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Backend returned " +
                response.status
            );

        }


        const result =
            await response.json();


        if (!result.data) {

            throw new Error(
                "No sensor data received"
            );

        }


        updateDashboard(
            result.data
        );


        setConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Sensor connection error:",
            error
        );


        setConnectionStatus(
            false
        );

    }

}


/* ============================================================
   UPDATE DASHBOARD
   ============================================================ */

function updateDashboard(data) {

    if (!data) {

        return;

    }


    if (
        gauges.temperature &&
        data.temperature !== undefined
    ) {

        gauges.temperature.update(
            data.temperature
        );

        updateDisplayedValue(
            "temperatureValue",
            data.temperature,
            1
        );

    }


    if (
        gauges.humidity &&
        data.humidity !== undefined
    ) {

        gauges.humidity.update(
            data.humidity
        );

        updateDisplayedValue(
            "humidityValue",
            data.humidity,
            1
        );

    }


    if (
        gauges.smoke &&
        data.smoke !== undefined
    ) {

        gauges.smoke.update(
            data.smoke
        );

        updateDisplayedValue(
            "smokeValue",
            data.smoke,
            0
        );

    }


    if (
        gauges.gas &&
        data.gas !== undefined
    ) {

        gauges.gas.update(
            data.gas
        );

        updateDisplayedValue(
            "gasValue",
            data.gas,
            0
        );

    }


    if (
        gauges.water &&
        data.water !== undefined
    ) {

        gauges.water.update(
            data.water
        );

        updateDisplayedValue(
            "waterValue",
            data.water,
            1
        );

    }


    if (
        gauges.solar &&
        data.solar !== undefined
    ) {

        gauges.solar.update(
            data.solar
        );

        updateDisplayedValue(
            "solarValue",
            data.solar,
            0
        );

    }


    if (
        gauges.battery &&
        data.battery !== undefined
    ) {

        gauges.battery.update(
            data.battery
        );

        updateDisplayedValue(
            "batteryValue",
            data.battery,
            1
        );

    }

}


/* ============================================================
   DISPLAY VALUES
   ============================================================ */

function updateDisplayedValue(
    elementId,
    value,
    decimals
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.textContent =
        Number(value).toFixed(
            decimals
        );

}


/* ============================================================
   CONNECTION STATUS
   ============================================================ */

function setConnectionStatus(
    connected
) {

    const status =
        document.getElementById(
            "networkStatus"
        );


    const address =
        document.getElementById(
            "networkAddress"
        );


    const topStatus =
        document.getElementById(
            "topConnectionStatus"
        );


    const dot =
        document.querySelector(
            ".connection-dot"
        );


    const connectivity =
        document.querySelector(
            ".connectivity"
        );


    if (!status || !address) {

        return;

    }


    if (connected) {

        if (connectivity) {

            connectivity.classList.add(
                "connected"
            );

        }


        status.textContent =
            "CONNECTED";


        address.textContent =
            "FASTAPI / SENSOR STREAM";


        if (topStatus) {

            topStatus.textContent =
                "CONNECTED";

            topStatus.style.color =
                "#00E58A";

        }


        if (dot) {

            dot.style.background =
                "#00E58A";

            dot.style.boxShadow =
                "0 0 9px #00E58A";

        }

    }


    else {

        if (connectivity) {

            connectivity.classList.remove(
                "connected"
            );

        }


        status.textContent =
            "WAITING";


        address.textContent =
            "WAITING FOR SENSOR DATA";


        if (topStatus) {

            topStatus.textContent =
                "WAITING";

            topStatus.style.color =
                "#FFC247";

        }


        if (dot) {

            dot.style.background =
                "#FFC247";

            dot.style.boxShadow =
                "0 0 9px #FFC247";

        }

    }

}


/* ============================================================
   CLOCK
   ============================================================ */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock) {

        return;

    }


    clock.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

}


/* ============================================================
   START SENSOR MONITORING
   ============================================================ */

function startSensorMonitoring() {

    fetchSensorData();


    setInterval(
        fetchSensorData,
        2000
    );

}


/* ============================================================
   APPLICATION START
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeGauges();

        setConnectionStatus(
            false
        );

        updateClock();


        setInterval(
            updateClock,
            1000
        );


        startSensorMonitoring();

    }
);
