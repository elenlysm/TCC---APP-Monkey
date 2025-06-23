import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '@components/Button';
import Container from '@components/Container';
import AuthBackground from '@components/ui/AuthBackground';
import { colors, fonts, fontSizes } from '@constants/theme';
import { useRouter } from 'expo-router';
import { auth } from '@services/firebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import api from '../services/api';

//Importação de componentes personalizados + tema da aplicação

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            //Login no Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('Login Firebase OK:', user.uid);

            //Pegando o token JWT (ID Token)
            const token = await user.getIdToken();
            console.log('Token Firebase:', token);

            //Fazendo uma chamada de teste pro backend
            const response = await api.get('/users');
            console.log('Resposta do backend:', response.data);

            //Redirecionar para a tela principal
            router.replace('/(tabs)/financeiro/home');
        } catch (error: any) {
            console.error('Erro no login:', error);

            if (error.code === 'auth/wrong-password') {
                setError('Senha incorreta.');
            } else if (error.code === 'auth/user-not-found') {
                setError('Usuário não encontrado.');
            } else if (error.code === 'auth/invalid-email') {
                setError('E-mail inválido.');
            } else {
                setError('Erro ao fazer login. Tente novamente.');
            }
        } finally {
            setLoading(false);
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
                {/*Campo de entrada email*/}

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {/*Campo de entrada de senha*/}

                <TouchableOpacity onPress={() => router.push('/auth/resetPassword')}>
                    <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                {/*Link para a tela de "Esqueci minha senha"*/}
                <View style={styles.buttonGroup}>
                    <Button title="Entrar" onPress={() => console.log('Entrar')} />
                    {/*Botão de login + chamada de lógica de autenticação*/}
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
    forgotPassword: {
        color: colors.primary,
        textAlign: 'right',
        marginBottom: 24,
        fontFamily: fonts.main,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
//Estilos e layout dos campos
