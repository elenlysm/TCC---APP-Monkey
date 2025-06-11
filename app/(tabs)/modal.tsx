import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DialogBodyProps = {
    onConnect: () => void;
    onCancel: () => void;
};

export default function DialogBody({ onConnect, onCancel }: DialogBodyProps) {
    return (
        <View style={styles.dialogBodyContainer}>
            <Text style={styles.title}>Conectar Open Finance</Text>
            <Text style={styles.message}>
                Para acessar os dados bancários, conecte sua conta via Open Finance.
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
                    <Text style={styles.connectText}>Conectar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Exemplo de função para habilitar Open Finance (adicione onde for usar o modal)
async function habilitarOpenFinance() {
    // Chame aqui sua lógica de autenticação Open Finance
    // Por exemplo, redirecionar para OAuth, abrir WebView, etc.
    alert('Open Finance habilitado!');
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
