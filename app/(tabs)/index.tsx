// app/screens/index.tsx
// Tela inicial do aplicativo

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeOffset, Filter, G, Path, Svg } from 'react-native-svg';

// Componente de mensagem de boas-vindas
function Mensagemdeboasvindas() {
    return (
        <>
            <Text style={styles.ao}>ao</Text>
            <Text style={styles.bemvindo}>Bem-vindo</Text>
        </>
    );
}

// Componente principal da tela inicial
function TelaInicial() {
    const router = useRouter();

    return (
        // Garante que o conteúdo fique dentro da área segura do dispositivo
        <SafeAreaView style={styles.container}>
            {/* Fundo da tela com imagem */}
            <ImageBackground source={require('../../src/assets/images/deep-unsplash.png')} style={{ flex: 1, justifyContent: 'center' }}>
                {/* Permite rolagem do conteúdo */}
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <View style={styles.telainicialContainer}>
                        <View style={styles.vectorContainer}>
                            <Svg style={styles.vector} width="412" height="361" viewBox="0 0 412 361" fill="none" >
                                <G filter="url(#filter0_d_17_2)">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M214.68 0.895523C255.691 -3.33057 297.606 7.79967 332.057 25.8761C366.223 43.8028 392.283 70.6122 405.832 101.193C418.728 130.3 407.738 161.042 405.585 191.833C403.197 225.996 416.541 263.405 392.5 291.866C367.863 321.033 321.705 333.733 278.614 342.15C236.765 350.325 192.455 350.556 151.972 338.849C112.925 327.558 80.0511 305.415 57.0144 278.07C35.6064 252.658 36.0833 221.187 27.7399 191.383C18.6099 158.769 -12.7202 124.828 5.69944 94.7619C24.1642 64.6218 78.6126 64.7466 115.461 48.1958C149.735 32.801 175.583 4.92431 214.68 0.895523Z" fill="#97A08E" />
                                </G>
                                <Defs>
                                    <Filter id="filter0_d_17_2" x="-13" y="0" width="425" height="361" filterUnits="userSpaceOnUse">
                                        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <FeOffset dx="-13" dy="13" />
                                        <FeComposite in2="hardAlpha" operator="out" />
                                        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_2" />
                                        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_2" result="shape" />
                                    </Filter>
                                </Defs>
                            </Svg>

</View>

                        <View style={styles.mensagemdeboasvindasContainer}>
                            <Mensagemdeboasvindas />


                            {/* Logo centralizada */}
                            <Image
                                source={require('../../src/assets/images/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
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
                                source={require('../../src/assets/images/carteira.png')}
                                style={{ width: 200, height: 114, alignSelf: 'center', marginVertical: 16 }}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Botão de Login */}
                        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
                            <Text style={styles._button}>
                                Login
                            </Text>
                            <View style={styles.arrowright}>
                                {/* Ícone de seta para a direita */}
                                <Svg style={styles.icon} width="13" height="13" viewBox="0 0 13 13" fill="none" >
                                    <Path d="M1.83333 6.49992H11.1667M11.1667 6.49992L6.5 1.83325M11.1667 6.49992L6.5 11.1666" stroke="#070000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </View>
                        </TouchableOpacity>

                        {/* Linha decorativa separando os botões */}
                        <Svg style={styles.line1} width="270" height="18" viewBox="0 0 270 18" fill="none" >
                            {/* ...SVG da linha... */}
                        </Svg>

                        {/* Botão de cadastro */}
                        <TouchableOpacity style={styles.__button} onPress={() => router.push('/auth/cadastro')}>
                            <Text style={styles.___button}>
                                Cadastre-se
                            </Text>
                            <View style={styles._arrowright}>
                                {/* Ícone de seta para a direita */}
                                <Svg style={styles.icon} width="12" height="13" viewBox="0 0 12 13" fill="none" >
                                    <Path d="M1.33333 6.50004H10.6667M10.6667 6.50004L6 1.83337M10.6667 6.50004L6 11.1667" stroke="#070000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </View>
                        </TouchableOpacity>

                        {/* Logo extra no rodapé */}
                        <ImageBackground
                            style={styles.logo_icon}
                            source={require('../../src/assets/images/logo_icon.png')}
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
        //backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    vectorContainer: {
        position: "relative",
        flexShrink: 0,
        height: 348,
        width: 412,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    vector: {
        position: "absolute",
        flexShrink: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "visible"
    },
    mensagemdeboasvindasContainer: {
        position: "relative",
        flexShrink: 0,
        marginTop: 200,
        height: 323,
        width: 445
    },
    ao: {
        position: "absolute",
        flexShrink: 0,
        top: 48,
        width: 426,
        height: 130,
        textAlign: "center",
        color: "rgba(116, 79, 56, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 55,
        fontWeight: "400",
        textShadowColor: "rgba(24, 16, 10, 1)",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 0.5
    },
    bemvindo: {
        position: "absolute",
        flexShrink: 0,
        width: 426,
        height: 130,
        textAlign: "center",
        color: "rgba(116, 79, 56, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 55,
        fontWeight: "400",
        textShadowColor: "rgba(24, 16, 10, 1)",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 0.5
    },
    logo: {
        position: "relative",
        flexShrink: 0,
        width: 383,
        height: 187,
        marginLeft: 50,
        marginBottom: 100,
        marginTop: 100,
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
        position: "relative",
        flexShrink: 0,
        width: 383,
        height: 187,
    },
});

export default TelaInicial;