const temp=new Gauge("tempGauge","°C","#FF4444",60);

const hum=new Gauge("humidityGauge","%","#00E5FF",100);

const smoke=new Gauge("smokeGauge","PPM","#FFA500",1000);

const gas=new Gauge("gasGauge","PPM","#FFD700",1000);

const water=new Gauge("waterGauge","%","#2196F3",100);

const solar=new Gauge("solarGauge","W","#00FF88",1000);

const battery=new Gauge("batteryGauge","%","#66FF66",100);

setInterval(()=>{

temp.update(Math.random()*50);

hum.update(Math.random()*100);

smoke.update(Math.random()*600);

gas.update(Math.random()*400);

water.update(Math.random()*100);

solar.update(Math.random()*1000);

battery.update(60+Math.random()*40);

},1000);

function updateClock(){

document.getElementById("clock").innerHTML=new Date().toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();
