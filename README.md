# SensorPotSimulator

Sensor Simulator for SensorPot Project

## Running Steps

1. Copy ```env``` to ```.env```
2. Configure options
3. Start the program by ```node app.js```

## Configuration

#### Overall Sensor Number, (Performance Caution!!!):

```SIMULATED_USERS=100```

#### Lumen update Interval, 1000 = 1S

```LUMEN_INTERVAL=3000```

#### Humidity update Interval, 1000 = 1S

```HUMIDITY_INTERVAL=5000```

#### Temperature update Interval, 1000 = 1S

```TEMPERATURE_INTERVAL= 10000```

#### MQTT BROKER URL

```BROKER_URL = 'mqtt://127.0.0.1:1883'```