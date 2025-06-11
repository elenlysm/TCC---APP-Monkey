import AuthBackground from '@/components/ui/AuthBackground';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { colors, fonts, fontSizes } from '../../theme';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');

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
                <View style={styles.buttonGroup}>
                    <Button title="Cancelar" variant="subtle" onPress={() => console.log('Cancelar')} />
                    <Button title="Resetar a Senha" onPress={() => console.log('Resetar a Senha')} />
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
        marginBottom: 24,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
});