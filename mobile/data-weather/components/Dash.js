import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import styles from '../styles/DashboardStyles';
import { fetchStats } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const stats = await fetchStats();
                setData(stats);
                setLoading(false);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const getRecommendation = () => {
        if (!data) return '';

        const { temperatura, umidade } = data;

        if (temperatura > 30 && umidade < 40) {
            return 'Está fazendo calor e iniciando tempo seco. Favor beba água!';
        } else if (temperatura > 30 && umidade >= 40) {
            return 'Está bem quente, mas a umidade está boa. Mantenha-se hidratado!';
        } else if (temperatura >= 20 && temperatura <= 30 && umidade >= 50) {
            return 'O tempo está agradável. Aproveite o dia!';
        } else if (temperatura >= 20 && temperatura <= 30 && umidade < 50) {
            return 'O tempo está bom, mas um pouco seco. Beba água!';
        } else if (temperatura < 20 && umidade >= 50) {
            return 'Está frio com boa umidade. Vista-se bem!';
        } else if (temperatura < 20 && umidade < 50) {
            return 'Está frio e começando a ficar seco. Beba água e agasalhe-se!';
        } else {
            return 'As condições estão neutras. Tenha um bom dia!';
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data ? (
                <View>
                    <View style={styles.containerLogo}>
                        <Image source={require('../assets/img/logo.png')} style={styles.logoImage} />
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statText}>
                            ⛅ Temperatura Atual: {data.temperatura.toFixed(1)}°C
                        </Text>
                        <Text style={styles.statText}>
                            💧 Umidade Atual: {data.umidade.toFixed(1)}%
                        </Text>
                    </View>

                    {/* Contêiner de recomendação */}
                    <View style={styles.recommendationContainer}>
                        <Text style={styles.recommendationTitle}> 💡 Recomendação</Text>
                        <Text style={styles.recommendationText}>
                            {getRecommendation()}
                        </Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.errorText}>Erro ao carregar dados.</Text>
            )}

            {/* Botões */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Temperature')}
                >
                    <Text style={styles.buttonText}>🌡️ Temperatura</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Humidity')}
                >
                    <Text style={styles.buttonText}>💧 Umidade</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Projections')}
                >
                    <Text style={styles.buttonText}>📈 Projeções</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
