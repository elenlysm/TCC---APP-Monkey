import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

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

interface CheckboxProps {
    label: string;
    description?: string;
}

function CheckboxField({ label, description }: CheckboxProps) {
    return (
        <View style={styles.checkboxField}>
            <View style={styles.checkboxRow}>
                <View style={styles.checkbox}>
                    <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <Path
                            d="M12.3333 1L4.99999 8.33333L1.66666 5"
                            stroke="#F5F5F5"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>
                <Text style={styles.checkboxLabel}>{label}</Text>
            </View>
            {description && <Text style={styles.description}>{description}</Text>}
        </View>
    );
}

export default function FormRegister() {
    return (
        <View style={styles.container}>
            <InputField label="Nome Completo :" placeholder="Seu nome" />
            <InputField label="E-mail :" placeholder="@email.com" />
            <InputField label="Senha :" secureTextEntry />
            <InputField label="Confirmar a Senha :" secureTextEntry />

            <CheckboxField
                label="Aceito os Termos de Uso e a Política de Privacidade"
                description="Em conformidade à LGPD e Open Finance Brasil"
            />

            <CheckboxField label="Não sou um robô" />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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
    checkboxField: {
        marginTop: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    checkbox: {
        width: 16,
        height: 16,
        backgroundColor: '#2C2C2C',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 15,
        fontFamily: 'Anonymous Pro',
        color: '#1E1E1E',
        flexShrink: 1,
    },
    description: {
        fontSize: 10,
        fontFamily: 'Anonymous Pro',
        color: '#757575',
        marginLeft: 26,
        marginTop: 4,
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
