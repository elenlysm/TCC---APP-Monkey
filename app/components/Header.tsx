import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import { colors, fonts, fontSizes } from '../theme';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Container>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Confirme a Senha:</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <View style={styles.buttonGroup}>
                <Button title="Cadastrar" onPress={() => console.log('Cadastrar')} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: fonts.main,
        fontSize: fontSizes.label,
        color: colors.textPrimary,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: fontSizes.regular,
        fontFamily: fonts.secondary,
        color: colors.textPrimary,
        marginBottom: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
