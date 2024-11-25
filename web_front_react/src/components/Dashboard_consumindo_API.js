import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

// Configuração do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [stats, setStats] = useState(null); // Armazena dados das rotas

    // Função para buscar dados da API
    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:3001/stats/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados de ${endpoint}:`, error);
            return null;
        }
    };

    // Carregar dados ao iniciar o componente
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const [temperaturaStats, umidadeStats, geralStats, ultimoDiaStats] = await Promise.all([
                fetchData('temperatura'),
                fetchData('umidade'),
                fetchData('geral'),
                fetchData('ultimoDia'),
            ]);

            setStats({
                temperatura: temperaturaStats || { stats: {} },
                umidade: umidadeStats || { stats: {} },
                geral: geralStats || { correlacao: 0 },
                ultimoDia: ultimoDiaStats || [],
            });

            // Preparar dados do gráfico
            if (geralStats?.temperatura && geralStats?.umidade) {
                setChartData({
                    labels: Array.from({ length: geralStats.temperatura.length }, (_, i) => `Dia ${i + 1}`),
                    datasets: [
                        {
                            label: 'Temperatura (°C)',
                            data: geralStats.temperatura,
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Umidade (%)',
                            data: geralStats.umidade,
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            tension: 0.4,
                        },
                    ],
                });
            }

            setLoading(false);
        };

        loadData();
    }, []);

    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Carregando dados...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">DASHBOARD</h1>

            {/* Estatísticas */}
            {stats && (
                <div className="stats-container">
                    <h2 className="stats-title">Estatísticas Gerais</h2>
                    <p>Temperatura Média: {stats.temperatura.stats.media || 'N/A'}°C</p>
                    <p>Umidade Média: {stats.umidade.stats.media || 'N/A'}%</p>
                    <p>Correlação: {stats.geral.correlacao?.toFixed(2) || 'N/A'}</p>
                </div>
            )}

            {/* Botões para abrir modais */}
            <div className="buttons-container">
                <button className="button" onClick={() => openModal('🌡️ Estatísticas de Temperatura')}>
                    🌡️ Temperatura
                </button>
                <button className="button" onClick={() => openModal('💧 Estatísticas de Umidade')}>
                    💧 Umidade
                </button>
                <button className="button" onClick={() => openModal('📊 Estatísticas Gerais')}>
                    📊 Geral
                </button>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ❌
                        </button>
                        <h2 className="modal-title">{modalContent}</h2>
                        <div className="modal-content">
                            {modalContent.includes('Temperatura') && stats?.temperatura?.stats && (
                                <div>
                                    <p>📈 Média: {stats.temperatura.stats.media || 'N/A'}°C</p>
                                    <p>📉 Mínimo: {stats.temperatura.stats.minimo || 'N/A'}°C</p>
                                    <p>📊 Máximo: {stats.temperatura.stats.maximo || 'N/A'}°C</p>
                                </div>
                            )}
                            {modalContent.includes('Umidade') && stats?.umidade?.stats && (
                                <div>
                                    <p>📈 Média: {stats.umidade.stats.media || 'N/A'}%</p>
                                    <p>📉 Mínimo: {stats.umidade.stats.minimo || 'N/A'}%</p>
                                    <p>📊 Máximo: {stats.umidade.stats.maximo || 'N/A'}%</p>
                                </div>
                            )}
                            {modalContent.includes('Geral') && stats?.geral && (
                                <div>
                                    <p>Correlação entre Temperatura e Umidade: {stats.geral.correlacao?.toFixed(2) || 'N/A'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Gráfico */}
            <div className="chart-container">
                <Line data={chartData} />
            </div>
        </div>
    );
}
