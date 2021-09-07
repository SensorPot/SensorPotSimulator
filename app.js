require('dotenv').config();
const mqtt = require('mqtt');
const clientNum = process.env.SIMULATED_USERS;
const lumenInterval = process.env.LUMEN_INTERVAL;
const humidityInterval = process.env.HUMIDITY_INTERVAL;
const temperatureInterval = process.env.TEMPERATURE_INTERVAL;
const brokerUrl = process.env.BROKER_URL;

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
                "}}"
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
                "}}"
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
                "}}"
            element.publish("publish", payload, {qos: 0, retain: true});
            console.log("Publish temperature value: " + value.toString());
        })
}, temperatureInterval);
