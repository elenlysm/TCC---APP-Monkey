import React, { ReactNode } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import MenuFechado from './MenuFechado'; // seu menu com header e SVG

type AuthLayoutProps = {
    children: ReactNode;
};

/**
 * AuthLayout
 * Layout padrão para telas de autenticação.
 * Inclui um background com imagem, o menu/header e um espaço para o conteúdo das telas.
 * Usa KeyboardAvoidingView para melhor experiência com teclado em telas de formulário.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <View style={styles.container}>
            {/* Imagem de background full */}
            <ImageBackground
                source={require('../../assets/images/Logo/nome-logo-400dpi 1024x500.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Menu/Header fixo no topo */}
                <MenuFechado />

                {/* Conteúdo centralizado e com padding, ajustando para teclado */}
                <KeyboardAvoidingView
                    style={styles.content}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        marginTop: 175, // altura do header/menu
        padding: 16,
        justifyContent: 'flex-start',
    },
});

