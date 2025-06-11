// app/screens/index.tsx
// Tela inicial do aplicativo

import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

// Componente principal da tela inicial
function TelaInicial() {
    return (
        // Garante que o conteúdo fique dentro da área segura do dispositivo
        <SafeAreaView style={styles.container}>
            {/* Fundo da tela com imagem */}
            <ImageBackground source={require('../assets/images/deep-unsplash.png')} style={{ flex: 1, justifyContent: 'center' }}>
                {/* Permite rolagem do conteúdo */}
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <View style={styles.telainicialContainer}>
                        {/* SVG decorativo no topo */}
                        <Svg style={styles.vector} width="412" height="361" viewBox="0 0 412 361" fill="none" >
                            {/* ...SVG de fundo... */}
                        </Svg>

                        {/* Mensagem de boas-vindas */}
                        <Text style={styles.bemvindoa}>
                            {`Bem-vindo ao`}
                        </Text>

                        {/* Logo centralizada */}
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 250 }}
                            resizeMode="contain"
                        />

                        {/* Container de introdução */}
                        <View style={styles.telainicialintroducaoContainer}>
                            {/* SVG decorativo de fundo */}
                            <Svg style={styles.vector} width="412" height="706" viewBox="0 0 412 706" fill="none" >
                                {/* ...SVG de fundo... */}
                            </Svg>

                            {/* Frase de destaque */}
                            <Text style={styles.organizesuavidafinanceiradeformainteligente}>
                                Organize sua vida financeira de forma inteligente!
                            </Text>

                            {/* Imagem de carteira */}
                            <Image
                                source={require('../assets/images/carteira.png')}
                                style={{ width: 200, height: 114, alignSelf: 'center', marginVertical: 16 }}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Botão de Login */}
                        <View style={styles.button}>
                            <Text style={styles._button}>
                                Login
                            </Text>
                            <View style={styles.arrowright}>
                                {/* Ícone de seta para a direita */}
                                <Svg style={styles.icon} width="13" height="13" viewBox="0 0 13 13" fill="none" >
                                    <Path d="M1.83333 6.49992H11.1667M11.1667 6.49992L6.5 1.83325M11.1667 6.49992L6.5 11.1666" stroke="#070000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </View>
                        </View>

                        {/* Linha decorativa separando os botões */}
                        <Svg style={styles.line1} width="270" height="18" viewBox="0 0 270 18" fill="none" >
                            {/* ...SVG da linha... */}
                        </Svg>

                        {/* Botão de cadastro */}
                        <View style={styles.__button}>
                            <Text style={styles.___button}>
                                Cadastre-se
                            </Text>
                            <View style={styles._arrowright}>
                                {/* Ícone de seta para a direita */}
                                <Svg style={styles.icon} width="12" height="13" viewBox="0 0 12 13" fill="none" >
                                    <Path d="M1.33333 6.50004H10.6667M10.6667 6.50004L6 1.83337M10.6667 6.50004L6 11.1667" stroke="#070000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </View>
                        </View>

                        {/* Logo extra no rodapé */}
                        <ImageBackground
                            style={styles.logo_icon}
                            source={require('../assets/images/logo_icon.png')}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView >
    );
}

// Estilos da tela inicial
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    telainicialContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 198, 1)",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    vector: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    bemvindoa: {
        marginTop: 60,
        textAlign: "center",
        color: "rgba(116, 79, 56, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 40,
        fontWeight: "400",
        textShadowColor: "rgba(24, 16, 10, 1)",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 0.5,
    },
    telainicialintroducaoContainer: {
        marginTop: 24,
        alignItems: "center",
        width: "100%",
    },
    organizesuavidafinanceiradeformainteligente: {
        marginTop: 16,
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 24,
        fontWeight: "400",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginTop: 32,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 0,
    },
    _button: {
        fontSize: 32,
        color: "#000",
        fontFamily: "Anonymous Pro",
        fontWeight: "400",
        textAlign: "center",
    },
    arrowright: {
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 16,
        height: 16,
    },
    line1: {
        marginTop: 32,
        alignSelf: "center",
    },
    __button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 0,
    },
    ___button: {
        fontSize: 32,
        color: "#000",
        fontFamily: "Anonymous Pro",
        fontWeight: "400",
        textAlign: "center",
    },
    _arrowright: {
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    logo_icon: {
        width: 100,
        height: 100,
        marginTop: 24,
        alignSelf: "center",
    },
});

export default TelaInicial;