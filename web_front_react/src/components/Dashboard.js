import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [generalChartData, setGeneralChartData] = useState({ labels: [], datasets: [] });

    const simulateDataFetch = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    temperatura: Array.from({ length: 10 }, () => (Math.random() * (35 - 15) + 15).toFixed(1)),
                    umidade: Array.from({ length: 10 }, () => (Math.random() * (80 - 20) + 20).toFixed(1)),
                });
            }, 1000);
        });
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const simulatedStats = await simulateDataFetch();
                setData(simulatedStats);
                setLoading(false);

                // Dados do gráfico por categoria
                setChartData({
                    labels: Array.from({ length: simulatedStats.temperatura.length }, (_, i) => `Dia ${i + 1}`),
                    datasets: [
                        {
                            label: 'Temperatura (°C)',
                            data: simulatedStats.temperatura,
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Umidade (%)',
                            data: simulatedStats.umidade,
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            tension: 0.4,
                        },
                    ],
                });

                // Dados do gráfico geral
                setGeneralChartData({
                    labels: Array.from({ length: simulatedStats.temperatura.length }, (_, i) => `Dia ${i + 1}`),
                    datasets: [
                        {
                            label: 'Temperatura e Umidade',
                            data: simulatedStats.temperatura.map((temp, index) => ({
                                x: parseFloat(temp),
                                y: parseFloat(simulatedStats.umidade[index]),
                            })),
                            borderColor: '#4BC0C0',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                            showLine: true,
                            pointRadius: 5,
                        },
                    ],
                });
            } catch (error) {
                alert('Erro: Não foi possível carregar os dados simulados.');
                setLoading(false);
            }
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
                <p>Carregando dados simulados...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">DASHBOARD</h1>

            {/* Simulação acima dos botões */}
            <div className="simulation-container">
                <h2 className="simulation-title">Está fazendo calor e tempo seco. Favor beba água!</h2>
                <p>Temperatura média: {Math.max(...data.temperatura)}°C</p>
                <p>Umidade média: {Math.max(...data.umidade)}%</p>
            </div>

            <div className="buttons-container">
                <button className="button" onClick={() => openModal('temperatura')}>
                    🌡️ Temperatura
                </button>
                <button className="button" onClick={() => openModal('umidade')}>
                    💧 Umidade
                </button>
                <button className="button" onClick={() => openModal('geral')}>
                    📊 Projeções
                </button>
            </div>

            {modalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ❌
                        </button>
                        <h2 className="modal-title">
                            {modalContent === 'temperatura' ? 'Temperatura' : modalContent === 'umidade' ? 'Umidade' : 'Gráfico Geral'}
                        </h2>
                        <div className="modal-content">
                            {modalContent === 'temperatura' && (
                                <Line data={chartData} />
                            )}
                            {modalContent === 'umidade' && (
                                <Line data={chartData} />
                            )}
                            {modalContent === 'geral' && (
                                <Line
                                    data={{
                                        labels: generalChartData.labels,
                                        datasets: generalChartData.datasets,
                                    }}
                                    options={{
                                        scales: {
                                            x: {
                                                type: 'linear',
                                                title: {
                                                    display: true,
                                                    text: 'Temperatura (°C)',
                                                },
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Umidade (%)',
                                                },
                                            },
                                        },
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}