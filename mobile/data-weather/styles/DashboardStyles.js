import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20, // Espaço extra no final da rolagem
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        color: '#333',
    },
    statsContainer: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    buttonsContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    recommendationContainer: {
        marginTop: 5,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#154c79',
        width: '100%',
        elevation: 3, // Sombra no Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, // Sombra no iOS
    },
    recommendationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    recommendationText: {
        fontSize: 18,
        color: '#fff',
    },
    loginImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    logoImage: {
        width: 150,   // Defina a largura da imagem
        height: 150,  // Defina a altura da imagem
    },
    containerLogo: {
        alignItems: 'center',
    },
    
});

export default styles;
