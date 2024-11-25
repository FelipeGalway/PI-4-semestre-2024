import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef6fc', // Fundo mais claro para indicar umidade
        padding: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 30, // Espaço extra no topo para melhor alinhamento
        paddingBottom: 20, // Espaço extra no final da rolagem
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2d5f7c', // Azul escuro para umidade
    },
    statsContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '90%',
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2d5f7c', // Azul escuro para consistência
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphContainer: {
        height: 250,
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20,
    },
    graphTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#1E90FF', // Azul claro para o gráfico
    },
    graphTitleBlue: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2d5f7c', // Azul escuro para o título
    },

    backButton: {
        backgroundColor: '#7a5cff',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 8,
        width: '90%',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;
