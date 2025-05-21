import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeFlowScreen() {
    const [name, setName] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                pagingEnabled
                showsVerticalScrollIndicator={false}
            >

                {/* Boas-vindas */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require("../assets/layout/bg-boasvindas.png")}
                        style={styles.fullScreen}
                        resizeMode="cover"
                    >
                        <Image
                            source={require("../assets/layout/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Bem-vindo!</Text>
                    </ImageBackground>
                </View>

                {/* Introdução */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require("../assets/layout/intro-bg.png")}
                        resizeMode="cover"
                        style={styles.fullScreen}
                    >
                        <Text style={styles.textCenter}>
                            Organize sua vida financeira de forma inteligente!
                        </Text>
                        <Image
                            source={require("../assets/layout/intro-figura.png")}
                            style={styles.imageBottom}
                            resizeMode="contain"
                        />
                    </ImageBackground>
                </View>

                {/* Tela de Login/Cadastro */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require("../assets/layout/login-bg.png")}
                        style={styles.fullScreen}
                        resizeMode="cover"
                    >
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Cadastre-se</Text>
                            <Image
                                source={require("../assets/layout/icon-seta.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                            <Image
                                source={require("../assets/layout/icon-seta.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                {/* Tela de Cadastro */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require("../assets/layout/cadastro-bg.png")}
                        style={styles.fullScreen}
                        resizeMode="cover"
                    >
                        <Text style={styles.label}>Nome Completo:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
