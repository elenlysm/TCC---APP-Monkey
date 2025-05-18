import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    page: {
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 32,
        color: '#000',
        textAlign: 'center',
    },
    introText: {
        fontSize: 28,
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    illustration: {
        width: '80%',
        height: 200,
    },
});
