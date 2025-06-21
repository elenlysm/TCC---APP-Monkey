import { useRouter } from 'expo-router';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from 'src/components/Button';
import Container from 'src/components/Container';
import AuthBackground from 'src/components/ui/AuthBackground';
import { colors, fonts, fontSizes } from 'src/constants/theme';
import { auth } from 'src/services/firebaseConfig';
import api from '../services/api';

export default function ChangePasswordScreen() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false); 
    //Estados dos campos de senha + visibilidade senha + erros

    const router = useRouter();

    const handleChangePassword = async () => { //Função principal para alterar a senha do usuário
        setError('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Preencha todos os campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (newPassword.length < 6) {
            setError('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const user = auth.currentUser;

            if (!user || !user.email) {
                setError('Usuário não autenticado.');
                return;
            } //Validação dos campos obrigatórios

            const credential = EmailAuthProvider.credential(user.email, currentPassword);

            //Reautenticar
            await reauthenticateWithCredential(user, credential);

            //Atualizar senha
            await updatePassword(user, newPassword);

            //Chamar o backend para enviar e-mail de notificação
            await api.post('/notify-password-change', {
                email: user.email,
            });

            alert('Senha alterada com sucesso! Um e-mail de confirmação foi enviado.');
            router.replace('../(tabs)/financeiro/home'); //Ou a tela que desejar

        } catch (err: any) {
            console.error('Erro ao alterar senha:', err);
            if (err.code === 'auth/wrong-password') { //Tratamento de erro específico do Firebase
                setError('Senha atual incorreta.');
            } else {
                setError('Erro ao alterar senha, tente novamente.');
            }
        }
    };

    return (
        <AuthBackground>
            <Container>
                <Text style={styles.label}>Senha Atual:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Digite sua senha atual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={!showCurrent}
                    /> 
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowCurrent(!showCurrent)}
                        activeOpacity={0.7}
                    > 
                        <Icon name={showCurrent ? 'eye' : 'eye-off'} size={22} color={colors.primary} />
                    </TouchableOpacity>
                </View> {/*Campo: Senha Atual*/}

                <Text style={styles.label}>Nova Senha:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Digite a nova senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!showNew}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowNew(!showNew)}
                        activeOpacity={0.7}
                    >
                        <Icon name={showNew ? 'eye' : 'eye-off'} size={22} color={colors.primary} />
                    </TouchableOpacity>
                </View> {/*Campo: Nova Senha*/}

                <Text style={styles.label}>Confirme a Nova Senha:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirm}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowConfirm(!showConfirm)}
                        activeOpacity={0.7}
                    >
                        <Icon name={showConfirm ? 'eye' : 'eye-off'} size={22} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}

                <View style={styles.buttonGroup}>
                    <Button title="Alterar Senha" onPress={handleChangePassword} />
                </View>
            </Container>
        </AuthBackground> 
    ); {/*Campo: Confirmação da Nova Senha*/}
}

const styles = StyleSheet.create({
    label: {
        fontFamily: fonts.main,
        fontSize: fontSizes.label,
        color: colors.textPrimary,
        marginBottom: 8,
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
