import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "../styles/InitialFlow.styles";

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
                        source={require("../assets/Layout/deep-unsplash.png")}
                        style={styles.fullScreen}
                        resizeMode="cover"
                    >
                        <Image
                            source={require("../assets/Logo/nome-logo-400dpi 1024x500.png")}
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
            </ScrollView>
        </SafeAreaView>
    );
}
