import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        height,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});
