const statsService = require("../services/statsService");

async function getTemperatureStats(req, res) {
    try {
        const stats = await statsService.getTemperatureStats(
            req.query.startDate,
            req.query.endDate
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de temperatura",
        });
    }
}

async function getHumidityStats(req, res) {
    try {
        const stats = await statsService.getHumidityStats(
            req.query.startDate,
            req.query.endDate
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de umidade",
        });
    }
}

async function getGeneralStats(req, res) {
    try {
        const stats = await statsService.getGeneralStats(
            req.query.startDate,
            req.query.endDate
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular estatísticas gerais" });
    }
}

async function getLastDayStats(req, res) {
    try {
        const stats = await statsService.getLastDayStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas do último dia",
        });
    }
}

async function getCurrentData(req, res) {
    try {
        const data = await statsService.getCurrentData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados atuais" });
    }
}

async function getDailyTemperatureStats(req, res) {
    try {
        const stats = await statsService.getDailyTemperatureStats(
            req.query.startDate,
            req.query.endDate
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas diárias de temperatura",
        });
    }
}

async function getDailyHumidityStats(req, res) {
    try {
        const stats = await statsService.getDailyHumidityStats(
            req.query.startDate,
            req.query.endDate
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas diárias de umidade",
        });
    }
}

async function getRawData(req, res) {
    try {
        const data = await statsService.getRawData(
            req.query.startDate,
            req.query.endDate
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao buscar dados brutos do sensor",
        });
    }
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
