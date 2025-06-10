import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type DialogBodyProps = {
    onConnect: () => void;
    onCancel: () => void;
};

export default function DialogBody({ onConnect, onCancel }: DialogBodyProps) {
    return (
        <View style={styles.dialogBodyContainer}>
            <View style={styles.svgContainer}>
                {/* SVG ilustrativo simples para o modal */}
                <Svg width="81" height="80" viewBox="0 0 81 80" fill="none">
                    <Path
                        d="M40.5 10C24.2975 10 11 23.2975 11 39.5C11 55.7025 24.2975 69 40.5 69C56.7025 69 70 55.7025 70 39.5C70 23.2975 56.7025 10 40.5 10ZM40.5 63C27.2975 63 16.5 52.2025 16.5 39C16.5 25.7975 27.2975 15 40.5 15C53.7025 15 64.5 25.7975 64.5 39C64.5 52.2025 53.7025 63 40.5 63Z"
                        fill="#1E8087"
                        opacity={0.2}
                    />
                    <Path
                        d="M40.5 25C36.0817 25 32.5 28.5817 32.5 33C32.5 37.4183 36.0817 41 40.5 41C44.9183 41 48.5 37.4183 48.5 33C48.5 28.5817 44.9183 25 40.5 25ZM40.5 37C38.0147 37 36 34.9853 36 32.5C36 30.0147 38.0147 28 40.5 28C42.9853 28 45 30.0147 45 32.5C45 34.9853 42.9853 37 40.5 37Z"
                        fill="#1E8087"
                    />
                </Svg>
            </View>

            <Text style={styles.title}>Conectar com Open Finance</Text>
            <Text style={styles.message}>
                Para continuar, conecte sua conta bancária de forma segura via Open Finance.
            </Text>

            <View style={styles.buttonContainer}>
                {/* Botão Conectar com acessibilidade */}
                <TouchableOpacity
                    style={styles.connectButton}
                    onPress={onConnect}
                    accessibilityLabel="Conectar com Open Finance"
                    accessible
                >
                    <Text style={styles.connectText}>Conectar</Text>
                </TouchableOpacity>

                {/* Botão Cancelar com acessibilidade */}
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
        maxWidth: 350, // Limita largura máxima para melhor responsividade
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
        // gap removido para compatibilidade
    },
    connectButton: {
        backgroundColor: '#1E8087',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginRight: 10, // Usado para espaçamento entre botões
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
