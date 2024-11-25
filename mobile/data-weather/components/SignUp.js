
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();


    const handleSubmit = async () => {
        if (!cpf || !name || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }
    
        try {
            const userData = { cpf, name, email, password };
            await AsyncStorage.setItem(email, JSON.stringify(userData)); // Salvar usando o e-mail como chave
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.secondaryButtonText}>Voltar para Login</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
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
