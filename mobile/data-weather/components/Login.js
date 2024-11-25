import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            // Busca os dados do usuário no AsyncStorage
            const storedUser = await AsyncStorage.getItem(email); // A chave é o e-mail do usuário
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.password === password) {
                    // Login bem-sucedido
                    onLogin(); // Notifica o estado do App.js
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }], // Navega para Dash limpando o histórico de navegação
                    });
                } else {
                    Alert.alert('Erro', 'Senha incorreta.');
                }
            } else {
                Alert.alert('Erro', 'Usuário não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer login.');
            console.error('Erro ao buscar usuário:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/login-sf.png')} style={styles.loginImage} />
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.secondaryButtonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    loginImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    secondaryButton: {
        marginTop: 10,
        paddingVertical: 10,
    },
    secondaryButtonText: {
        color: '#007AFF',
    },
});

export default Login;
