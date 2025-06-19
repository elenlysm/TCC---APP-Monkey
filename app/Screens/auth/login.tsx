import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../../../src/components/Button';
import Container from '../../../src/components/Container';
import AuthBackground from '../../../src/components/ui/AuthBackground';
import { colors, fonts, fontSizes } from '../../theme';
//Importação de componentes personalizados + tema da aplicação

export default function LoginScreen({ navigation }: any) //Navegação entre telas
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Armazenamento de e-mail e senha digitados

    return (
        <AuthBackground>
            <Container>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address" //Usa teclado com "@" no celular
                    autoCapitalize="none" //Não coloca a primeira letra em maiúsculo
                /> {/*Campo de entrada email*/}

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry //Oculta os caracteres da senha
                /> {/*Campo de entrada de senha*/}

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
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
