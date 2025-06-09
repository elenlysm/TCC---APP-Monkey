// app/screens/tela-inicial.tsx
//Tela inicial do aplicativo
// Importando bibliotecas necessárias

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const TelaInicial: React.FC = () => {
    const [textInput1, onChangeTextInput1] = useState('');
    const [textInput2, onChangeTextInput2] = useState('');
    const [textInput3, onChangeTextInput3] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={textInput1}
                    onChangeText={onChangeTextInput1}
                    placeholder="Input 1"
                />
                <TextInput
                    style={styles.input}
                    value={textInput2}
                    onChangeText={onChangeTextInput2}
                    placeholder="Input 2"
                />
                <TextInput
                    style={styles.input}
                    value={textInput3}
                    onChangeText={onChangeTextInput3}
                    placeholder="Input 3"
                />
                <TouchableOpacity style={styles.button}>
                    <Text>Enviar</Text>
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
});

export default TelaInicial;