import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    scrollContainer: {
        padding: 20,
        paddingBottom: 50, // Espaço extra para rolagem confortável
        alignItems: 'center',
        backgroundColor: '#f0f8ff', // Fundo azul claro para diferenciar a tela de projeções
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2d5f7c', // Azul escuro para destaque
        textAlign: 'center',
    },

    graphContainer: {
        height: 250,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20, // Espaço entre os gráficos
    },

    graphTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333', // Cinza escuro para contraste
    },

    statsContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '100%',
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20, // Espaço entre as seções
    },

    statText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#2d5f7c', 
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
