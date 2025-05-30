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

export default function FormForgotPassword() {
    return (
        <View style={styles.container}>
            <InputField label="E-mail :" placeholder="@email.com" />

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Resetar a Senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFF',
        borderRadius: 8,
        gap: 24,
    },
    inputField: {
        gap: 8,
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
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    buttonOutline: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    buttonOutlineText: {
        color: '#303030',
        fontSize: 16,
        fontFamily: 'Anonymous Pro',
    },
    buttonPrimary: {
        backgroundColor: '#2C2C2C',
        borderColor: '#2C2C2C',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    buttonPrimaryText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontFamily: 'Anonymous Pro',
    },
});
