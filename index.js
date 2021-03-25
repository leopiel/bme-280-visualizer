const express = require("express");

const config = require("./config");
const sensor = require("./sensor");

const PORT = 3001;

sensor.initSensor();

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.render("index", {
		fileData: JSON.stringify(sensor.getFileData()),
	});
});

app.listen(config.SERVER_PORT, (err) => {
	if (err) {
		return console.error(err);
	}
	console.log(`App listening at http://localhost:${config.SERVER_PORT}`);
});
