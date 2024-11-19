import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

// Configuração do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  //  const navigate = useNavigate();

    // Simulação de dados
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

                // Preparar dados do gráfico
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
            } catch (error) {
                alert('Erro: Não foi possível carregar os dados simulados.');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Textos para os botões
    const temperatureText = `
TEMPERATURA:
A temperatura, no contexto climático, é a medida do calor ou frio na atmosfera de uma determinada região. Ela é um dos principais fatores que influenciam as condições climáticas e os padrões de tempo.
...

A temperatura é essencial para definir o clima de uma região, como tropical, temperado ou polar.
`;

    const humidityText = `
UMIDADE:
A umidade é a quantidade de vapor d'água no ar, influenciando o clima, a sensação térmica e os padrões de precipitação.
...

A umidade é essencial para entender o clima, afetando precipitação e a formação de tempestades.
`;

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
                <button className="button" onClick={() => openModal(temperatureText)}>
                    🌡️ Temperatura
                </button>
                <button className="button" onClick={() => openModal(humidityText)}>
                    💧 Umidade
                </button>
            </div>

            {modalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ❌
                        </button>
                        <h2 className="modal-title">{modalContent.includes('TEMPERATURA') ? 'Temperatura' : 'Umidade'}</h2>
                        <p className="modal-text">{modalContent}</p>
                        <div className="chart-container">
                            <Line data={chartData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
