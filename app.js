//Overall Sensor Number, (Performance Caution!!!):
const clientNum = 1000;
//Lumen update Interval, 1000 = 1S
const lumenInterval = 3000;
//Humidity update Interval, 1000 = 1S
const humidityInterval = 5000;
//Temperature update Interval, 1000 = 1S
const temperatureInterval = 10000;

const mqtt = require('mqtt');
const brokerUrl = "mqtt://127.0.0.1:1883";

const clients = [];
let index = 1;
while (clients.length < clientNum) {
    clients.push(mqtt.connect(brokerUrl, {clientId: "client" + index}));
    index++;
}

//Publish luminous flux: Lumen
setInterval(function () {
    clients.forEach(
        element => {
            //console.log(element)
            const value = Math.ceil(Math.random() * 5000);
            let payload = "{\"sensorID\":\"" + "s_" + element.options.clientId + "\",\"timestamp\":\"" + Date.now() + "\",\"payload\":{" +
                "\"lighting\": \"" + value.toString() + "\"" +
                "}"
            element.publish("publish", payload, {qos: 0, retain: true});
            console.log("Publish lighting value: " + value.toString());
        })
}, lumenInterval);

//Publish humidity: 30-80
setInterval(function () {
    clients.forEach(
        element => {
            const value = Math.floor(Math.random() * 51) + 30;
            let payload = "{\"sensorID\":\"" + "s_" + element.options.clientId + "\",\"timestamp\":\"" + Date.now() + "\",\"payload\":{" +
                "\"humidity\": \"" + value.toString() + "\"" +
                "}"
            console.log("Publish humidity value: " + value.toString());
            element.publish("publish", payload, {qos: 0, retain: true});
        }
    )
}, humidityInterval);

//temperature 15-35
setInterval(function () {
    clients.forEach(
        element => {
            const value = Math.floor(Math.random() * 21) + 15;
            let payload = "{\"sensorID\":\"" + "s_" + element.options.clientId + "\",\"timestamp\":\"" + Date.now() + "\",\"payload\":{" +
                "\"temperature\": \"" + value.toString() + "\"" +
                "}"
            element.publish("publish", payload, {qos: 0, retain: true});
            console.log("Publish temperature value: " + value.toString());
        })
}, temperatureInterval);
