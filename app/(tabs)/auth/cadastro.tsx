import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../../src/components/Button';
import Container from '../../../src/components/Container';
import AuthBackground from '../../../src/components/ui/AuthBackground';
import { colors, fonts, fontSizes } from '../../theme';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://192.168.56.1:8081', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: password,
                    confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.error || 'Erro ao cadastrar.');
            }
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro de conexão com o servidor.');
        }
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.7}
                    >
                        <Icon
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={22}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Confirme a Senha:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        activeOpacity={0.7}
                    >
                        <Icon
                            name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={22}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>

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
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 16,
    },
    inputPassword: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: fontSizes.regular,
        fontFamily: fonts.secondary,
        color: colors.textPrimary,
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        height: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
