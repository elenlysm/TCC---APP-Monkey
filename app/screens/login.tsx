import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface InputFieldProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
}

function InputField({ label, placeholder, secureTextEntry }: InputFieldProps) {
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#B3B3B3"
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

export default function FormLogin() {
    return (
        <View style={styles.container}>
            <InputField label="E-mail :" placeholder="@email.com" />
            <InputField label="Senha :" secureTextEntry />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        gap: 10,
    },
    inputField: {
        gap: 5,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Anonymous Pro',
        color: '#1E1E1E',
    },
    input: {
        backgroundColor: '#FFF',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'Anonymous Pro',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2C2C2C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontFamily: 'Anonymous Pro',
    },
});
