require('dotenv').config();
const mqtt = require('mqtt');
const db = require("./config/db");

const clientNum = process.env.SIMULATED_USERS;
const lumenInterval = process.env.LUMEN_INTERVAL;
const humidityInterval = process.env.HUMIDITY_INTERVAL;
const temperatureInterval = process.env.TEMPERATURE_INTERVAL;
const brokerUrl = process.env.BROKER_URL;

const clients = [];
let sensorGroup = {};

async function initialise() {
    if (process.env.READ_SENSOR_FROM_DB === 'false') {
        let index = 1;
        while (clients.length < clientNum) {
            clients.push(mqtt.connect(brokerUrl, {clientId: index.toString()}));
            index++;
        }
    } else {
        let sensorList;
        let query = "SELECT * FROM sensor";
        db.query(query, (err, result) => {
            if (err) {
                console.log(err.message)
                sensorList = null
            }
            sensorList = result
            console.log(sensorList)
            if (sensorList && sensorList.length > 0) {
                sensorList.map(sensor => {
                    clients.push(mqtt.connect(brokerUrl, {clientId: sensor.sensorID.toString()}));
                    sensorGroup[sensor.sensorID] = sensor.groupID;
                })
            } else {
                console.log("Cannot get sensor list, application exit");
                process.exit();
            }
        });
    }
}

initialise().then(r => {
    //Publish luminous flux: Lumen
    setInterval(function () {
        clients.forEach(
            element => {
                //console.log(element)
                const value = Math.ceil(Math.random() * 5000);
                let payload = "{\"sensorID\":" + element.options.clientId + ",\"groupID\":" + sensorGroup[element.options.clientId] + ",\"timestamp\":" + Date.now() + ",\"payload\":{" +
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
                let payload = "{\"sensorID\":" + element.options.clientId + ",\"groupID\":" + sensorGroup[element.options.clientId] + ",\"timestamp\":" + Date.now() + ",\"payload\":{" +
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
                let payload = "{\"sensorID\":" + element.options.clientId + ",\"groupID\":" + sensorGroup[element.options.clientId] + ",\"timestamp\":" + Date.now() + ",\"payload\":{" +
                    "\"temperature\": \"" + value.toString() + "\"" +
                    "}}"
                element.publish("publish", payload, {qos: 0, retain: true});
                console.log("Publish temperature value: " + value.toString());
            })
    }, temperatureInterval);
});

