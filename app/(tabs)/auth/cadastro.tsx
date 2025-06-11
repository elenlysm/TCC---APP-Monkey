import AuthBackground from '@/components/ui/AuthBackground';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { colors, fonts, fontSizes } from '../../theme';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            setError('Preencha todos os campos.');
            return;
        }
        if (!email.includes('@')) {
            setError('E-mail inválido.');
            return;
        }
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        setError('');
        // Chame a API de cadastro aqui
    };

    return (
        <AuthBackground>
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

                {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}

                <View style={styles.buttonGroup}>
                    <Button title="Cadastrar" onPress={handleSignUp} />
                </View>
            </Container>
        </AuthBackground>
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
