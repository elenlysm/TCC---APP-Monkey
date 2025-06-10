// app/screens/tela-inicial.tsx
// Tela inicial do aplicativo

import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const TelaInicial: React.FC = () => {
    // Estados para os campos de texto
    const [textInput1, onChangeTextInput1] = useState('');
    const [textInput2, onChangeTextInput2] = useState('');
    const [textInput3, onChangeTextInput3] = useState('');

    // Função para tratar o envio dos dados
    const handleEnviar = () => {
        // Validação simples: todos os campos devem estar preenchidos
        if (!textInput1 || !textInput2 || !textInput3) {
            Alert.alert('Atenção', 'Preencha todos os campos.');
            return;
        }
        // Aqui você pode tratar o envio dos dados (ex: enviar para API)
        Alert.alert('Sucesso', 'Dados enviados com sucesso!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Título</Text>
                {/* Campo de texto 1 */}
                <TextInput
                    style={styles.input}
                    value={textInput1}
                    onChangeText={onChangeTextInput1}
                    placeholder="Input 1"
                    accessibilityLabel="Campo de texto 1"
                />
                {/* Campo de texto 2 */}
                <TextInput
                    style={styles.input}
                    value={textInput2}
                    onChangeText={onChangeTextInput2}
                    placeholder="Input 2"
                    accessibilityLabel="Campo de texto 2"
                />
                {/* Campo de texto 3 */}
                <TextInput
                    style={styles.input}
                    value={textInput3}
                    onChangeText={onChangeTextInput3}
                    placeholder="Input 3"
                    accessibilityLabel="Campo de texto 3"
                />
                {/* Botão de envio */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleEnviar}
                    accessibilityLabel="Botão enviar"
                    accessible
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
    button: { backgroundColor: '#007bff', padding: 12, borderRadius: 4, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }, // Melhor contraste
});

export default TelaInicial;