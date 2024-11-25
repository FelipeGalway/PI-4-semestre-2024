const SensorData = require("../models/sensorData");
const { calculateStats } = require("../../../utils/statsCalculator");

async function getTemperatureStats(startDate, endDate) {
    const data = await SensorData.fetchSensorData(startDate, endDate);
    const temperaturas = data.map((item) => item.temperatura);
    return calculateStats(temperaturas);
}

async function getHumidityStats(startDate, endDate) {
    const data = await SensorData.fetchSensorData(startDate, endDate);
    const umidades = data.map((item) => item.umidade);
    return calculateStats(umidades);
}

async function getGeneralStats(startDate, endDate) {
    const data = await SensorData.fetchSensorData(startDate, endDate);
    const temperaturas = data.map((item) => item.temperatura);
    const umidades = data.map((item) => item.umidade);

    return {
        temperatura: calculateStats(temperaturas),
        umidade: calculateStats(umidades),
    };
}

async function getLastDayStats() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const data = await SensorData.fetchSensorData(oneDayAgo);

    const temperaturas = data.map((item) => item.temperatura);
    const umidades = data.map((item) => item.umidade);

    return {
        temperatura: calculateStats(temperaturas),
        umidade: calculateStats(umidades),
        numeroLeituras: data.length,
    };
}

async function getCurrentData() {
    return SensorData.fetchCurrentSensorData();
}

function groupDataByDay(data) {
    const groupedData = {};
    data.forEach((item) => {
        const date = item.data_hora.split("T")[0]; // Extrai a data (YYYY-MM-DD)
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(item);
    });
    return groupedData;
}

function calculateDailyStats(groupedData, property) {
    const dailyStats = [];
    for (const [date, dataPoints] of Object.entries(groupedData)) {
        const values = dataPoints.map((item) => item[property]);
        const stats = calculateStats(values);
        dailyStats.push({
            date,
            media: Number(stats.media.toFixed(2)),
            mediana: Number(stats.mediana.toFixed(2)),
            desvioPadrao: Number(stats.desvioPadrao.toFixed(2)),
            minimo: Number(stats.minimo.toFixed(2)),
            maximo: Number(stats.maximo.toFixed(2)),
        });
    }
    return dailyStats;
}

async function getDailyTemperatureStats(startDate, endDate) {
    const data = await SensorData.fetchSensorData(startDate, endDate);
    const groupedData = groupDataByDay(data);
    return calculateDailyStats(groupedData, "temperatura");
}

async function getDailyHumidityStats(startDate, endDate) {
    const data = await SensorData.fetchSensorData(startDate, endDate);
    const groupedData = groupDataByDay(data);
    return calculateDailyStats(groupedData, "umidade");
}

async function getRawData(startDate, endDate) {
    return await SensorData.fetchSensorData(startDate, endDate);
}

module.exports = {
    getTemperatureStats,
    getHumidityStats,
    getGeneralStats,
    getLastDayStats,
    getCurrentData,
    getDailyTemperatureStats,
    getDailyHumidityStats,
    getRawData,
};
