import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Mask, Path, G } from 'react-native-svg';

type DialogBodyProps = {
    onConnect: () => void;
    onCancel: () => void;
};

export default function DialogBody({ onConnect, onCancel }: DialogBodyProps) {
    return (
        <View style={styles.dialogBodyContainer}>
            <View style={styles.svgContainer}>
                <Svg width="81" height="80" viewBox="0 0 81 80" fill="none">
                    {/* Aqui mantém o conteúdo SVG existente */}
                </Svg>
            </View>

            <Text style={styles.title}>Conectar com Open Finance</Text>
            <Text style={styles.message}>
                Para continuar, conecte sua conta bancária de forma segura via Open Finance.
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

const styles = StyleSheet.create({
    dialogBodyContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5,
    },
    svgContainer: {
        marginBottom: 20,
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
        gap: 10,
    },
    connectButton: {
        backgroundColor: '#1E8087',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
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
