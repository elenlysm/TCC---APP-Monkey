import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//Importação react + componentes visuais React Native

type DialogBodyProps = {
    onConnect: () => void; //Função chamada quando o usuário clicar em "Conectar"
    onCancel: () => void; //Função chamada quando o usuário clicar em "Cancelar"
};

export default function DialogBody({ onConnect, onCancel }: DialogBodyProps) {
    return (
        <View style={styles.dialogBodyContainer}>
            <Text style={styles.title}>Conectar Open Finance</Text> {/*Título do diálogo*/}
            <Text style={styles.message}>
                Para acessar os dados bancários, conecte sua conta via Open Finance.
            </Text> {/* Mensagem explicativa para o usuário */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
                    <Text style={styles.connectText}>Conectar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View> {/*Container dos botões */}
        </View>
    );
} //Componente funcional que exibe o corpo do diálogo/modal


async function habilitarOpenFinance() {
    alert('Open Finance habilitado!');
} //Função para habilitar Open Finance

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
//Estilos e layout dos campos
