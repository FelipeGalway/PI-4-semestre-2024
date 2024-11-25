const axios = require("axios");
const config = require("../../../config/config");

const API_BASE_URL = config.sensorApiBaseUrl;

async function getSensorData(startDate, endDate) {
	try {
		const params = {};
		if (startDate) params.startDate = startDate;
		if (endDate) params.endDate = endDate;

		const response = await axios.get(`${API_BASE_URL}/sensor/data`, {
			params,
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 400) {
			throw new Error("Parâmetros de consulta inválidos");
		}
		throw new Error("Erro ao buscar dados do sensor");
	}
}

async function getCurrentSensorData() {
	try {
		const response = await axios.get(`${API_BASE_URL}/sensor/current`);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao buscar dados atuais do sensor");
	}
}

module.exports = {
	getSensorData,
	getCurrentSensorData,
};
