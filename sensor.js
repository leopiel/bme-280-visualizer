const BME280 = require("bme280-sensor");
const fs = require("fs");

const config = require('./config');
const bme280 = new BME280({i2cAddress: config.I2C_ADDRESS});

const cleanUpOldData = (fileData) => {
	return fileData.filter(
		(measurement) => measurement.timestamp > Date.now() - config.DATA_TTL
	);
};

const readSensorData = async () => {
	try {
		const data = await bme280.readSensorData();
		const timestamp = Date.now();
		const fileRaw = fs.readFileSync("./sensor_log.json", "utf8");

		let fileData = JSON.parse(fileRaw);

		fileData.push({
			timestamp,
			data: {
				temperature: data.temperature_C,
				pressure: Math.round(parseFloat(data.pressure_hPa)),
				humidity: Math.round(parseFloat(data.humidity) * 100) / 100,
			},
		});

		fileData = cleanUpOldData(fileData);
		fs.writeFileSync("./sensor_log.json", JSON.stringify(fileData));
	} catch (err) {
		console.error(`BME280 read error: ${err}`);
	}

	setTimeout(readSensorData, config.READ_SENSOR_DATA_INTERVAL);
};

const initSensor = async () => {
	try {
		await bme280.init();
		console.log("BME280 initialization succeeded");

		readSensorData();
	} catch (err) {
		console.error(`BME280 initialization failed: ${err} `);
	}
};

const getFileData = () => {
	return JSON.parse(fs.readFileSync("./sensor_log.json", "utf8"));
};

module.exports = {
	initSensor,
	getFileData,
};
