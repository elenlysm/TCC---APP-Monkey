import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '@components/Button';
import Container from '@components/Container';
import AuthBackground from '@components/ui/AuthBackground';
import { colors, fonts, fontSizes } from '@constants/theme';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from 'src/services/firebaseConfig';
import api from '../services/api';
//Importação do tema e componentes personalizados: cores, fontes e tamanhos


export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); //Controle de visibilidade 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);//Controle de visibilidade 
    const router = useRouter();

    const handleSignUp = async () => {
        setError('')

        // Validação simples de campos
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
        try {
            // Firebase Auth - Criação do usuário
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('Usuário criado no Firebase:', user.uid);
            
            console.log('Usuario salvo no backend com sucesso');
            
            // Enviar e-mail de verificação
            await sendEmailVerification(userCredential.user);
            Alert.alert(
                'Cadastro realizado!',
                'Um e-mail de verificação foi enviado para sua caixa de entrada.'
            );

            // Redirecionar para login
            router.replace('/auth/login');

              // Resetar os campos
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (error: any) {
            console.error('Erro ao cadastrar:', error);
            
            if (error.code === 'auth/email-already-in-use') {
                setError('Este e-mail já está sendo utilizado!');
            } else if (error.code === 'auth/invalid-email') {
                setError('E-mail inválido!');
            } else if (error.code === 'auth/weak-password') {
                setError('Senha fraca! Use pelo menos 6 caracteres.');
            } else {
                setError('Erro ao cadastrar usuário, tente novamente')
            }
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
                {/*Campo de e-mail*/}

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
                {/*Campo de senha com botão de mostrar/ocultar*/}

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
                {/*Campo de confirmação de senha com botão de mostrar/ocultar*/}

                {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
                {/*Exibe a mensagem de erro, se houver*/}

                <View style={styles.buttonGroup}>
                    <Button title="Cadastrar" onPress={handleSignUp} />
                </View> 
                {/*Botão de cadastro*/}
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
//Estilos personalizados para os componentes da tela
