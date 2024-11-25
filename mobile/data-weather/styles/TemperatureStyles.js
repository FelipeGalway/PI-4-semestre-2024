import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 30, // Espaço extra no final da rolagem
        paddingBottom: 20, // Espaço extra no final da rolagem
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#5c5c5c',
    },
    statsContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '90%',
        elevation: 3,
    },
    statText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
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
        marginBottom: 20,
    },
    graphTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#007AFF',
    },
    graphTitleRed: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
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
