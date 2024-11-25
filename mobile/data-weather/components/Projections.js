import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';
import { fetchRawData } from '../services/api'; // Importação da função de API
import styles from '../styles/ProjectionsStyles';

export default function Projections() {
    const [projections, setProjections] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const calculateProjections = async () => {
            try {
                const rawData = await fetchRawData('2024-11-15'); // Data inicial arbitrária

                // Calcular projeções baseado nos dados brutos
                const nextWeekProjections = rawData.slice(0, 5).map((item, index) => ({
                    day: `Dia ${index + 1}`,
                    temperatura: (item.temperatura * 1.02).toFixed(1), // Incremento arbitrário de 2%
                    umidade: (item.umidade * 1.01).toFixed(1), // Incremento arbitrário de 1%
                }));

                setProjections(nextWeekProjections);
                setLoading(false);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar as projeções.');
                console.error('Erro ao processar projeções:', error);
                setLoading(false);
            }
        };

        calculateProjections();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Carregando projeções...</Text>
            </View>
        );
    }

    // Preparar dados para os gráficos
    const temperatureData = projections.map((item) => parseFloat(item.temperatura)); // Temperaturas projetadas
    const humidityData = projections.map((item) => parseFloat(item.umidade)); // Umidades projetadas

    // Componente para exibir valores sobre as barras
    const Labels = ({ x, y, bandwidth, data, unit }) => (
        data.map((value, index) => (
            <SVGText
                key={index}
                x={x(index) + bandwidth / 2} // Centraliza o texto na barra
                y={y(value) - 10} // Posiciona o texto acima da barra
                fontSize={12}
                fill="#007AFF"
                alignmentBaseline="middle"
                textAnchor="middle"
            >
                {value}{unit}
            </SVGText>
        ))
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>📈 Projeções para os próximos dias</Text>

            {/* Gráfico de Temperatura */}
            {projections.length > 0 && (
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitle}>Projeções de Temperatura (5d)</Text>
                    <BarChart
                        style={{ flex: 1 }}
                        data={temperatureData}
                        svg={{ fill: '#FF4500' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.4}
                    >
                        <Grid />
                        <Labels data={temperatureData} unit="°C" />
                    </BarChart>
                </View>
            )}

            {/* Gráfico de Umidade */}
            {projections.length > 0 && (
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitle}>Projeções de Umidade (5d)</Text>
                    <BarChart
                        style={{ flex: 1 }}
                        data={humidityData}
                        svg={{ fill: '#1E90FF' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.4}
                    >
                        <Grid />
                        <Labels data={humidityData} unit="%" />
                    </BarChart>
                </View>
            )}

            {/* Lista de Projeções */}
            <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>📊 Projeções Detalhadas</Text>
                {projections.map((item, index) => (
                    <View key={index} style={styles.projectionItem}>
                        <Text style={styles.projectionText}>
                            {item.day}: 🌡️ {item.temperatura}°C | 💧 {item.umidade}%
                        </Text>
                    </View>
                ))}
            </View>


            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}> Voltar</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
