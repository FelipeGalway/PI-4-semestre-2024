import axios from 'axios';

// Configuração base da API
const api = axios.create({
    baseURL: 'http://192.168.210.52:3001/api/v1', // apenas alterar para IP da sua máquina, a porta continuará 3001
    timeout: 10000, // Timeout opcional
});

// Função para buscar dados de estatísticas atuais
export const fetchStats = async () => {
    try {
        const response = await api.get('/stats/atual');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

export default api;
