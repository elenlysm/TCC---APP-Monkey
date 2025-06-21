import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'src/components/Button';
import Container from 'src/components/Container';
import AuthBackground from 'src/components/ui/AuthBackground';
import { auth } from 'src/services/firebaseConfig';
import { colors, fonts, fontSizes } from '../../src/constants/theme';

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState(''); //Input de email
    const [emailEnviado, setEmailEnviado] = useState(false); //Mensagem de sucesso após envio
    const [error, setError] = useState(''); //Mensagens de erro
    const router = useRouter(); //Instância do roteador (navegação)


    const handleResetPassword = async() => {
        if (!email) { //Validação simples: campo obrigatório
            setError ('Por favor, digite seu e-mail.');
            return;
        } 

        try{ //Envia e-mail usando Firebase Auth
            await sendPasswordResetEmail(auth, email);
            setEmailEnviado(true);
            setError('');
        } catch (error: any) { //Trata erro no envio do e-mail
            console.log('Erro ao enviar o e-mail reset', error);
            alert('Erro ao enviar o e-mail de recuperação, verifique o e-mail digitado.');
        }
    }; //Função que envia o e-mail de redefinição de senha

    const handleGoBack = () => {
        router.replace('/auth/login');
    }; //Navega de volta para a tela de login

    return (
        <AuthBackground>
            <Container> {/*Campo de entrada de e-mail*/}
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite seu e-mail'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                />

                {error ? <Text style={styles.error}>{error}</Text>: null} {/*Exibe erro, se houver*/}
                {emailEnviado ? (
                    <View style={styles.infoBox}>
                        <Text style={styles.successText}>E-mail de recuperação enviado!</Text> {/*Confirmação de sucesso*/}
                        <Text style={styles.infoText}>Verifique sua caixa de entrada. Caso não receba, clique em "Reenviar".</Text>
                        <View style={styles.buttonGroup}>
                            <Button title='Reenviar' onPress = {handleResetPassword}/> {/*Botão para reenviar o e-mail */}
                            <Button title='Voltar ao Login' variant='subtle' onPress={handleGoBack}/> {/*Botão para voltar ao login*/}
                        </View>
                    </View>
                ):( 
                    <View style={styles.buttonGroup}> 
                    <Button title='Cancelar' variant='subtle' onPress={() => router.replace('/auth/login')}/>
                    <Button title='Resetar a Senha' onPress={handleResetPassword}/>
                </View> //Caso o e-mail ainda não tenha sido enviado
                )}
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
        marginBottom: 24,
    },
    buttonGroup:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    error:{
        color: colors.error,
        marginBottom: 8,
        fontSize: 14,
    },
    successText:{
        color: colors.success,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    infoText:{
        color: colors.textPrimary,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    infoBox:{
        marginTop: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.success,
        borderRadius: 8,
    },
}); //Estilos personalizados da tela