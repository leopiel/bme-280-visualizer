# BME-280 visualizer

NodeJS program for visualizing bme-280 sensor data. Meant for use with raspberry-pi.

# Running program

The server can be started with:

```
npm install && node index.js
```

After that it starts reading sensor data and writes it to `sensor_log.json` from which it's being passed to front-end. The front-end is accessible from port 3001.

To keep the program running in the background one can use [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) or something similar. Inside project folder run:
```
npm install -g pm2 && npm install && pm2 start index.js
```

# Config

Config can be found in `config.js` and contains following options:

| NAME                        | DEFAULT    | DESCRIPTION                                                                    |
| --------------------------- | ---------- | ------------------------------------------------------------------------------ |
| `SERVER_PORT`               | 3001       | The port for the nodejs server. The front-end is accessible from root path "*ip_address*:3001/" |
| `DATA_TTL`                  | one week   | The period of time for which the data is kept. Older data will be deleted.     |
| `READ_SENSOR_DATA_INTERVAL` | 30 minutes | The interval for reading the sensor data and storing it to `sensor_log.json`   |
| `I2C_ADDRESS`                 | 0x76       | The i2c address from which the bme-280 data is being read                      |
