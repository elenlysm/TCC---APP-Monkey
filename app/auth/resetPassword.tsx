import React, { useState } from 'react';
import { StyleSheet ,Text, TextInput, View } from 'react-native';
import Container from 'src/components/Container';
import AuthBackground from 'src/components/ui/AuthBackground';
import { colors, fonts, fontSizes } from '../../src/constants/theme';
import Button from 'src/components/Button';
import { auth } from 'src/services/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');
    const [emailEnviado, setEmailEnviado] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleResetPassword = async() => {
        if (!email) {
            setError ('Por favor, digite seu e-mail.');
            return;
        }

        try{
            await sendPasswordResetEmail(auth, email);
            setEmailEnviado(true);
            setError('');
        } catch (error: any) {
            console.log('Erro ao enviar o e-mail reset', error);
            alert('Erro ao enviar o e-mail de recuperação, verifique o e-mail digitado.');
        }
    };

    const handleGoBack = () => {
        router.replace('/auth/login');
    };

    return (
        <AuthBackground>
            <Container>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite seu e-mail'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                />

                {error ? <Text style={styles.error}>{error}</Text>: null}
                {emailEnviado ? (
                    <View style={styles.infoBox}>
                        <Text style={styles.successText}>E-mail de recuperação enviado!</Text>
                        <Text style={styles.infoText}>Verifique sua caixa de entrada. Caso não receba, clique em "Reenviar".</Text>
                        <View style={styles.buttonGroup}>
                            <Button title='Reenviar' onPress = {handleResetPassword}/>
                            <Button title='Voltar ao Login' variant='subtle' onPress={handleGoBack}/>
                        </View>
                    </View>
                ):(
                    <View style={styles.buttonGroup}>
                    <Button title='Cancelar' variant='subtle' onPress={() => router.replace('/auth/login')}/>
                    <Button title='Resetar a Senha' onPress={handleResetPassword}/>
                </View>
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
});