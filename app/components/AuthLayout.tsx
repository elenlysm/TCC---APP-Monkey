import React, { ReactNode } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import MenuFechado from './MenuFechado'; // seu menu com header e SVG

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <View style={styles.container}>
            {/* Imagem de background full */}
            <ImageBackground
                source={require('../../assets/images/Layout/nome-logo-400dpi 1024x500.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Aqui o menu + header */}
                <MenuFechado />

                {/* Conteúdo das telas vai aqui */}
                <View style={styles.content}>
                    {children}
                </View>
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
        marginTop: 175, // altura do background ou do menu pra não ficar por cima
        padding: 16,
    },
});

