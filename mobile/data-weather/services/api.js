import axios from 'axios';

// Configuração base da API
const api = axios.create({
    baseURL: 'http://192.168.56.1:3001/api/v1', // apenas alterar para IP da sua máquina, a porta continuará 3001
    timeout: 10000, // Timeout opcional
});

// Função para buscar dados de estatísticas atuais
export const fetchStats = async () => {
    try {
        const response = await api.get('/stats/atual');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas atuais:', error);
        throw error;
    }
};

// Função para buscar dados de temperatura
export const fetchTemperatureStats = async () => {
    try {
        const response = await api.get('/stats/temperatura');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de temperatura:', error);
        throw error;
    }
};

// Função para buscar dados de umidade
export const fetchHumidityStats = async () => {
    try {
        const response = await api.get('/stats/umidade');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de umidade:', error);
        throw error;
    }
};

// Função para buscar dados brutos (usado para gráficos)
export const fetchRawData = async (startDate) => {
    try {
        const response = await api.get(`/stats/dados-brutos?startDate=${startDate}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados brutos:', error);
        throw error;
    }
};

export default api;
