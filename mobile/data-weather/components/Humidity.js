import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, LineChart, Grid } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';
import { fetchStats, fetchHumidityStats, fetchRawData } from '../services/api'; // Importação centralizada
import styles from '../styles/HumidityStyles';

export default function Humidity() {
    const [currentHumidity, setCurrentHumidity] = useState(null);
    const [stats, setStats] = useState(null);
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const currentData = await fetchStats();
                setCurrentHumidity(currentData.umidade);

                const humidityStats = await fetchHumidityStats();
                setStats(humidityStats);

                const rawGraphData = await fetchRawData('2024-11-15'); // Data inicial arbitrária
                setGraphData(rawGraphData.slice(0, 5)); // Usar apenas os 5 primeiros registros

                setLoading(false);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }


    // Prepara os dados para os gráficos
    const barData = graphData.map((item) => item.umidade); // Valores das barras
    const lineData = graphData.map((item) => item.umidade); // Valores do gráfico de linha

    // Componente para exibir valores sobre as barras
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <SVGText
                key={index}
                x={x(index) + bandwidth / 2} // Centraliza o texto na barra
                y={y(value) - 10} // Posiciona o texto acima da barra
                fontSize={12}
                fill="#1E90FF"
                alignmentBaseline="middle"
                textAnchor="middle"
            >
                {value.toFixed(1)}%
            </SVGText>
        ))
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}> 📃 Dados de Umidade </Text>

            {/* Gráfico de Barras */}
            {graphData.length > 0 && (
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitleBlue}>📊 Gráfico Tipo Barra(5 dias)</Text>
                    <BarChart
                        style={{ flex: 1 }}
                        data={barData}
                        svg={{ fill: '#1E90FF' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.4} // Espaçamento entre as barras
                    >
                        <Grid />
                        {/* Adiciona os rótulos sobre as barras */}
                        <Labels />
                    </BarChart>
                </View>
            )}

            {/* Gráfico de Linhas */}
            {graphData.length > 0 && (
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitleBlue}>📈 Gráfico Tipo Linha(5 dias)</Text>
                    <LineChart
                        style={{ flex: 1 }}
                        data={lineData}
                        svg={{ stroke: '#4169E1', strokeWidth: 2 }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                </View>
            )}

            <Text style={styles.title}>📊 Estatísticas (Geral)  </Text>

            {/* Contêiner dos dados de estatísticas */}
            {stats && (
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}> 🟦 Média: {stats.media.toFixed(1)}%</Text>
                    <Text style={styles.statText}> 🟩 Mediana: {stats.mediana.toFixed(1)}%</Text>
                    <Text style={styles.statText}> 🟪 Desvio Padrão: {stats.desvioPadrao.toFixed(1)}%</Text>
                    <Text style={styles.statText}> 🔽 Mínimo: {stats.minimo.toFixed(1)}%</Text>
                    <Text style={styles.statText}> 🔼 Máximo: {stats.maximo.toFixed(1)}%</Text>
                </View>
            )}

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}> Voltar</Text>
                </TouchableOpacity>

        </ScrollView>
    );
}
