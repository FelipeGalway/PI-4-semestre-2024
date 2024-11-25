const { faker } = require("@faker-js/faker");
const sensorService = require("../services/sensorService");
const config = require("../../../config/config");

function generateFakeData(count = 100, startDate, endDate) {
    const start = startDate
        ? new Date(startDate)
        : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    return Array.from({ length: count }, () => ({
        id: faker.number.int({ min: 1, max: 10000 }),
        data_hora: faker.date.between({ from: start, to: end }).toISOString(),
        temperatura: faker.number.float({ min: 15, max: 35, precision: 0.1 }),
        umidade: faker.number.float({ min: 30, max: 80, precision: 0.1 }),
    }));
}

async function fetchSensorData(startDate, endDate) {
    if (config.useFakeData) {
        console.log("Usando dados fictícios");
        return generateFakeData(100, startDate, endDate);
    }

    try {
        return await sensorService.getSensorData(startDate, endDate);
    } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
        throw error;
    }
}

async function fetchCurrentSensorData() {
    if (config.useFakeData) {
        console.log("Usando dados fictícios atuais");
        const fakeData = generateFakeData(1)[0];
        return {
            temperatura: fakeData.temperatura,
            umidade: fakeData.umidade,
        };
    }

    try {
        return await sensorService.getCurrentSensorData();
    } catch (error) {
        console.error("Erro ao buscar dados atuais do sensor:", error);
        throw error;
    }
}

module.exports = {
    fetchSensorData,
    fetchCurrentSensorData,
};
