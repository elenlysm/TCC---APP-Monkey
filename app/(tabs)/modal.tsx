import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DialogBodyProps = {
    onConnect: () => void;
    onCancel: () => void;
};

export default function DialogBody({ onConnect, onCancel }: DialogBodyProps) {
    return (
        <View style={styles.dialogBodyContainer}>
            <View style={styles.svgContainer}>
                <Image
                    source={require('../assets/images/banco.png')}
                    style={styles.bankImage}
                    resizeMode="contain"
                    accessibilityLabel="Ícone de banco"
                />
            </View>
            <Text style={styles.title}>Conectar com Open Finance</Text>
            <Text style={styles.message}>
                Para continuar, conecte sua conta bancária de forma segura via Open Finance.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.connectButton}
                    onPress={onConnect}
                    accessibilityLabel="Conectar com Open Finance"
                    accessible
                >
                    <Text style={styles.connectText}>Conectar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                    accessibilityLabel="Cancelar conexão"
                    accessible
                >
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dialogBodyContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5,
        maxWidth: 350,
    },
    svgContainer: {
        marginBottom: 20,
    },
    bankImage: {
        width: 64,
        height: 64,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    connectButton: {
        backgroundColor: '#1E8087',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginRight: 10,
    },
    connectText: {
        color: 'white',
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelText: {
        color: '#333',
    },
});
