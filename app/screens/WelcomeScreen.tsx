import { styles } from '../styles/WelcomeScreen.styles';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                pagingEnabled
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* Tela 1: Boas-vindas */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require('../assets/images/Layout/deep-0ECAhyBYxhE-unsplash(1).png')}
                        resizeMode="cover"
                        style={styles.background}
                    >
                        <Image
                            source={require('../assets/images/Logo/Sagui,logo-400dpi 512x512.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.welcomeText}>Bem-vindo ao Sagui</Text>
                    </ImageBackground>
                </View>

                {/* Tela 2: Introdução */}
                <View style={styles.page}>
                    <ImageBackground
                        source={require('../assets/images/Layout/round-icons-nBs_Fxr4dwk-unsplash.png')}
                        resizeMode="cover"
                        style={styles.background}
                    >
                        <Text style={styles.introText}>
                            Organize sua vida financeira de forma inteligente!
                        </Text>
                        <Image
                            source={require('../assets/images/Layout/round-icons-UHpQvEG56XY-unsplash.png')}
                            style={styles.illustration}
                            resizeMode="contain"
                        />
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
