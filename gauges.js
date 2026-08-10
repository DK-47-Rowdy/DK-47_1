/* ============================================================
   AI PORTABLE SAFETY CAMP
   TECHNICAL GAUGE SYSTEM
   Smooth / Slow Needle Animation
   ============================================================ */


class TechnicalGauge {


    constructor(elementId, options) {

        this.container =
            document.getElementById(elementId);


        if (!this.container) {

            console.error(
                "Gauge container not found:",
                elementId
            );

            return;

        }


        /* ====================================================
           GAUGE SETTINGS
           ==================================================== */

        this.label =
            options.label || "";

        this.unit =
            options.unit || "";

        this.min =
            options.min ?? 0;

        this.max =
            options.max ?? 100;

        this.targetValue =
            options.value ?? 0;

        this.displayValue =
            this.targetValue;

        this.color =
            options.color || "#00E5FF";

        this.warning =
            options.warning ?? 70;

        this.danger =
            options.danger ?? 90;

        this.decimals =
            options.decimals ?? 0;


        /*
         * Needle animation speed.
         *
         * Lower number =
         * slower and smoother movement.
         */

        this.animationSpeed =
            options.animationSpeed || 0.035;


        this.size =
            options.size || 270;


        /* ====================================================
           CANVAS
           ==================================================== */

        this.canvas =
            document.createElement("canvas");


        this.canvas.width =
            this.size;

        this.canvas.height =
            this.size;


        this.canvas.style.width =
            this.size + "px";

        this.canvas.style.height =
            this.size + "px";


        this.container.innerHTML = "";


        this.container.appendChild(
            this.canvas
        );


        this.ctx =
            this.canvas.getContext("2d");


        /* ====================================================
           GEOMETRY
           ==================================================== */

        this.cx =
            this.size / 2;

        this.cy =
            this.size / 2;

        this.radius =
            this.size * 0.38;


        this.animationFrame =
            null;


        /* ====================================================
           INITIAL DRAW
           ==================================================== */

        this.draw();

    }



    /* ========================================================
       UPDATE TARGET VALUE
       ======================================================== */

    update(value) {

        let numericValue =
            Number(value);


        if (
            Number.isNaN(
                numericValue
            )
        ) {

            return;

        }


        numericValue =
            Math.max(
                this.min,
                Math.min(
                    this.max,
                    numericValue
                )
            );


        this.targetValue =
            numericValue;


        if (
            !this.animationFrame
        ) {

            this.animate();

        }

    }



    /* ========================================================
       SMOOTH NEEDLE ANIMATION
       ======================================================== */

    animate() {

        const difference =
            this.targetValue -
            this.displayValue;


        /*
         * Smooth easing.
         *
         * Instead of jumping directly
         * to the new value, the needle
         * gradually approaches it.
         */

        this.displayValue +=
            difference *
            this.animationSpeed;


        /*
         * Prevent endless tiny movements.
         */

        if (
            Math.abs(
                difference
            ) < 0.02
        ) {

            this.displayValue =
                this.targetValue;

        }


        this.draw();


        /*
         * Continue animation until
         * the needle reaches the target.
         */

        if (
            Math.abs(
                this.targetValue -
                this.displayValue
            ) > 0.02
        ) {

            this.animationFrame =
                requestAnimationFrame(
                    () => this.animate()
                );

        }

        else {

            this.animationFrame =
                null;

        }

    }



    /* ========================================================
       STATUS DETECTION
       ======================================================== */

    getStatus() {

        const percentage =
            (
                (this.displayValue -
                    this.min)
                /
                (this.max -
                    this.min)
            ) * 100;


        /*
         * WATER / SOLAR / BATTERY
         *
         * Low values are dangerous.
         */

        if (
            this.label === "Water Level" ||
            this.label === "Solar Output" ||
            this.label === "Battery"
        ) {


            if (
                percentage <=
                this.danger
            ) {

                return "CRITICAL";

            }


            if (
                percentage <=
                this.warning
            ) {

                return "WARNING";

            }


            return "NORMAL";

        }


        /*
         * TEMPERATURE / HUMIDITY /
         * SMOKE / GAS
         *
         * High values are dangerous.
         */

        if (
            percentage >=
            this.danger
        ) {

            return "CRITICAL";

        }


        if (
            percentage >=
            this.warning
        ) {

            return "WARNING";

        }


        return "NORMAL";

    }



    /* ========================================================
       STATUS COLOR
       ======================================================== */

    getStatusColor() {

        const status =
            this.getStatus();


        if (
            status ===
            "CRITICAL"
        ) {

            return "#FF465D";

        }


        if (
            status ===
            "WARNING"
        ) {

            return "#FFC247";

        }


        return "#00E58A";

    }



    /* ========================================================
       DRAW GAUGE
       ======================================================== */

    draw() {

        const ctx =
            this.ctx;


        const cx =
            this.cx;


        const cy =
            this.cy;


        const r =
            this.radius;


        /* ====================================================
           CLEAR CANVAS
           ==================================================== */

        ctx.clearRect(
            0,
            0,
            this.size,
            this.size
        );


        /* ====================================================
           OUTER TECHNICAL RING
           ==================================================== */

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            r + 17,
            0,
            Math.PI * 2
        );


        ctx.strokeStyle =
            "rgba(255,255,255,0.055)";


        ctx.lineWidth =
            1;


        ctx.stroke();



        /* ====================================================
           TICK MARKS
           ==================================================== */

        const tickCount =
            41;


        const startAngle =
            Math.PI * 0.75;


        const endAngle =
            Math.PI * 2.25;


        for (
            let i = 0;
            i <= tickCount;
            i++
        ) {

            const ratio =
                i / tickCount;


            const angle =
                startAngle +
                ratio *
                (
                    endAngle -
                    startAngle
                );


            const outerRadius =
                r + 13;


            const innerRadius =
                r +
                (
                    i % 5 === 0
                        ? 5
                        : 9
                );


            const x1 =
                cx +
                Math.cos(angle) *
                innerRadius;


            const y1 =
                cy +
                Math.sin(angle) *
                innerRadius;


            const x2 =
                cx +
                Math.cos(angle) *
                outerRadius;


            const y2 =
                cy +
                Math.sin(angle) *
                outerRadius;


            ctx.beginPath();


            ctx.moveTo(
                x1,
                y1
            );


            ctx.lineTo(
                x2,
                y2
            );


            ctx.strokeStyle =
                i % 5 === 0
                    ? "rgba(180,200,220,0.65)"
                    : "rgba(100,120,145,0.28)";


            ctx.lineWidth =
                i % 5 === 0
                    ? 2
                    : 1;


            ctx.stroke();

        }



        /* ====================================================
           BACKGROUND ARC
           ==================================================== */

        ctx.beginPath();


        ctx.arc(
            cx,
            cy,
            r,
            startAngle,
            endAngle
        );


        ctx.strokeStyle =
            "rgba(255,255,255,0.08)";


        ctx.lineWidth =
            14;


        ctx.lineCap =
            "butt";


        ctx.stroke();



        /* ====================================================
           CALCULATE VALUE POSITION
           ==================================================== */

        let percentage =
            (
                this.displayValue -
                this.min
            )
            /
            (
                this.max -
                this.min
            );


        percentage =
            Math.max(
                0,
                Math.min(
                    1,
                    percentage
                )
            );


        const valueAngle =
            startAngle +
            percentage *
            (
                endAngle -
                startAngle
            );



        /* ====================================================
           COLORED VALUE ARC
           ==================================================== */

        ctx.beginPath();


        ctx.arc(
            cx,
            cy,
            r,
            startAngle,
            valueAngle
        );


        ctx.strokeStyle =
            this.color;


        ctx.lineWidth =
            14;


        ctx.lineCap =
            "round";


        ctx.shadowColor =
            this.color;


        ctx.shadowBlur =
            9;


        ctx.stroke();


        ctx.shadowBlur =
            0;



        /* ====================================================
           NEEDLE
           ==================================================== */

        const needleAngle =
            startAngle +
            percentage *
            (
                endAngle -
                startAngle
            );


        const needleLength =
            r - 12;


        const needleX =
            cx +
            Math.cos(
                needleAngle
            ) *
            needleLength;


        const needleY =
            cy +
            Math.sin(
                needleAngle
            ) *
            needleLength;


        ctx.beginPath();


        ctx.moveTo(
            cx,
            cy
        );


        ctx.lineTo(
            needleX,
            needleY
        );


        ctx.strokeStyle =
            "#F5F9FF";


        ctx.lineWidth =
            2.5;


        ctx.lineCap =
            "round";


        ctx.shadowColor =
            "rgba(255,255,255,0.5)";


        ctx.shadowBlur =
            5;


        ctx.stroke();


        ctx.shadowBlur =
            0;



        /* ====================================================
           CENTER HUB
           ==================================================== */

        ctx.beginPath();


        ctx.arc(
            cx,
            cy,
            7,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#101823";


        ctx.fill();


        ctx.strokeStyle =
            this.color;


        ctx.lineWidth =
            2;


        ctx.stroke();



        /* ====================================================
           DIGITAL VALUE

           MOVED DOWN
           ==================================================== */

        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.font =
            "600 24px Consolas, monospace";


        ctx.fillStyle =
            "#F1F6FF";


        /*
         * Previously:
         *
         * cy - 6
         *
         * Now:
         *
         * cy + 5
         *
         * This moves the value down.
         */

        ctx.fillText(
            this.displayValue.toFixed(
                this.decimals
            ),
            cx,
            cy + 5
        );



        /* ====================================================
           UNIT

           ALSO MOVED DOWN
           ==================================================== */

        ctx.font =
            "500 10px Rajdhani, sans-serif";


        ctx.fillStyle =
            "rgba(180,195,215,0.8)";


        /*
         * Previously:
         *
         * cy + 16
         *
         * Now:
         *
         * cy + 27
         */

        ctx.fillText(
            this.unit,
            cx,
            cy + 27
        );



        /* ====================================================
           STATUS

           NORMAL / WARNING / CRITICAL
           ==================================================== */

        const status =
            this.getStatus();


        const statusColor =
            this.getStatusColor();


        /*
         * Larger technical status text.
         */

        ctx.font =
            "700 13px Orbitron, monospace";


        ctx.fillStyle =
            statusColor;


        ctx.shadowColor =
            statusColor;


        ctx.shadowBlur =
            7;


        ctx.fillText(
            status,
            cx,
            cy + 68
        );


        ctx.shadowBlur =
            0;



        /* ====================================================
           SENSOR LABEL
           ==================================================== */

        ctx.font =
            "500 8px Rajdhani, sans-serif";


        ctx.fillStyle =
            "rgba(140,160,180,0.65)";


        ctx.fillText(
            this.label.toUpperCase(),
            cx,
            cy + 88
        );

    }

}
