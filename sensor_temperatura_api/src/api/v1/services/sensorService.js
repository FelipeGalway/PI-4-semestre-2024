const sensor = require("node-dht-sensor");
const { Op } = require("sequelize");
const SensorDHT11 = require("../models/sensorDHT11");
const environment = require("../../../config/environment");

function readSensor() {
	return new Promise((resolve, reject) => {
		sensor.read(
			environment.SENSOR_TYPE,
			environment.SENSOR_PIN,
			(err, temperature, humidity) => {
				if (err) reject(err);
				else resolve({ temperature, humidity });
			}
		);
	});
}

async function captureAndInsertData() {
	try {
		const { temperature, humidity } = await readSensor();

		const sensorData = await SensorDHT11.create({
			temperatura: temperature,
			umidade: humidity,
		});

		console.log(
			`Dados inseridos: Temperatura ${temperature}°C, Umidade ${humidity}%`
		);
		return sensorData;
	} catch (err) {
		console.error("Erro ao capturar ou inserir dados:", err);
		throw err;
	}
}

async function getSensorData(startDate, endDate) {
	let whereClause = {};

	if (startDate && endDate) {
		whereClause.data_hora = {
			[Op.between]: [new Date(startDate), new Date(endDate)],
		};
	} else if (startDate) {
		whereClause.data_hora = {
			[Op.gte]: new Date(startDate),
		};
	} else if (endDate) {
		whereClause.data_hora = {
			[Op.lte]: new Date(endDate),
		};
	}

	return await SensorDHT11.findAll({
		where: whereClause,
		order: [["data_hora", "DESC"]],
	});
}

async function getCurrentSensorData() {
	try {
		const { temperature, humidity } = await readSensor();
		return { temperatura: temperature, umidade: humidity };
	} catch (error) {
		console.error("Erro ao ler dados do sensor:", error);
		throw error;
	}
}

module.exports = {
	captureAndInsertData,
	getSensorData,
	getCurrentSensorData,
};
