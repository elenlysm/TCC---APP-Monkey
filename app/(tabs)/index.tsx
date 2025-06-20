//Tela inicial do aplicativo

import { useRouter } from 'expo-router';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path, Svg } from 'react-native-svg';
{/*Importa o hook de navegação do Expo (Emulador)
import React from 'react'; {/*Importa o React*/}
//Importação de componentes personalizados + componentes visuais e gráficos SVG

function Mensagemdeboasvindas() {
    return (
        <>
            <Text style={styles.bemvindo}>Bem-vindo</Text>
            <Text style={styles.ao}>ao</Text>
        </>
    );
} //Saudação inicial

function TelaInicial() {
    const router = useRouter(); //Navegação entre telas

    return (
        <SafeAreaView style={styles.container}> {/*Garante que o conteúdo fique dentro da área segura da tela*/}
            <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}> {/*ScrollView permite rolar o conteúdo caso ultrapasse a tela*/}
                <View style={styles.telainicialContainer}>
                    <View style={styles.vectorContainer}>
                        <ImageBackground
                            source={require('../../src/assets/images/deep-unsplash.png')}
                            style={styles.mensagemdeboasvindasContainer}
                            resizeMode="cover"
                        > {/*Imagem de fundo da parte superior da tela*/}
                            <Svg style={styles.vector} width="412" height="361" viewBox="0 0 412 361" fill="none" >
                                <G filter="url(#filter0_d_17_2)">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M214.68 0.895523C255.691 -3.33057 297.606 7.79967 332.057 25.8761C366.223 43.8028 392.283 70.6122 405.832 101.193C418.728 130.3 407.738 161.042 405.585 191.833C403.197 225.996 416.541 263.405 392.5 291.866C367.863 321.033 321.705 333.733 278.614 342.15C236.765 350.325 192.455 350.556 151.972 338.849C112.925 327.558 80.0511 305.415 57.0144 278.07C35.6064 252.658 36.0833 221.187 27.7399 191.383C18.6099 158.769 -12.7202 124.828 5.69944 94.7619C24.1642 64.6218 78.6126 64.7466 115.461 48.1958C149.735 32.801 175.583 4.92431 214.68 0.895523Z" fill="#97A08E" />
                                </G> {/*SVG decorativo*/}
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
                                </Defs> {/*Definição do filtro de sombra usado acima*/}
                            </Svg>
                            <Mensagemdeboasvindas />
                            <Image
                                source={require('../../src/assets/images/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </ImageBackground> {/*Logo da aplicação centralizada sobre a imagem*/}
                    </View>
                </View>

                <View style={styles.telainicialintroducaoContainer}>
                    <View style={styles.vectorContainer2}>
                        <Svg style={styles.vector2} width="640" height="640" viewBox="0 0 412 706" fill="none">
                            <G filter="url(#filter0_dddi_24_59)">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M168.105 34.9664C217.732 27.6977 262.161 63.2085 309.525 82.065C373.504 107.536 453.756 102.357 495.06 165.133C536.883 228.699 534.032 321.411 518.47 399.633C503.544 474.65 463.445 541.354 411.001 587.636C363.736 629.347 301.33 627.475 243.559 642.242C190.395 655.83 133.48 700.968 85.5026 670.833C36.2972 639.927 49.0497 548.303 13.5326 497.762C-20.5811 449.218 -98.6854 448.549 -113.266 387.984C-127.494 328.88 -83.0334 272.144 -52.858 221.976C-26.8279 178.7 11.0715 151.395 47.674 120.417C86.5108 87.5477 120.601 41.924 168.105 34.9664Z" fill="white" />
                                <Path d="M171.583 58.7129C189.656 56.0658 208.098 60.952 229.915 70.6494C240.832 75.502 251.671 81.1158 263.594 87.1455C274.495 92.6588 286.159 98.4428 298.229 103.386L300.647 104.363C318.355 111.413 336.791 116.189 354.151 120.312C372.041 124.561 388.23 128.006 404.046 132.641C434.598 141.594 458.206 153.54 474.253 177.19L475.011 178.325C510.727 232.609 510.3 315.188 495.64 391.329L494.931 394.949C481.16 464.165 444.283 525.799 396.257 568.633L395.121 569.641C375.764 586.723 352.771 595.474 325.853 601.65C312.266 604.768 298.325 607.1 283.345 609.699C269.563 612.09 255.014 614.691 240.515 618.262L237.615 618.989C222.472 622.86 207.533 628.845 193.921 634.538C179.773 640.455 167.262 645.957 154.8 650.231C130.185 658.673 113.264 659.566 98.9473 650.928L98.2676 650.51C83.3009 641.109 75.5229 620.916 67.8057 586.421C64.334 570.903 60.7457 552.284 55.9395 535.26C51.2046 518.488 44.7112 500.922 34.1992 485.453L33.1689 483.963C11.9745 453.803 -23.1264 438.478 -45.8037 426.255C-70.7523 412.807 -84.8583 401.938 -89.708 383.262L-89.9326 382.366C-95.211 360.439 -90.0523 337.453 -77.999 311.852C-65.9566 286.273 -49.6376 262.931 -33.8203 236.877L-32.292 234.347C-9.59954 196.62 22.6064 172.827 59.585 141.766L63.1787 138.736C73.5495 129.959 83.4953 120.424 92.8018 111.505C102.306 102.397 111.16 93.9151 120.164 86.2773C138.037 71.1166 154.003 61.5175 170.783 58.8359L171.583 58.7129Z" stroke="#744F38" strokeWidth="45" />
                            </G>
                            <Defs>
                                <Filter id="filter0_dddi_24_59" x="-135.4" y="0" width="725.4" height="705.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <FeOffset dx="-19" dy="24" />
                                    <FeGaussianBlur stdDeviation="0.2" />
                                    <FeComposite in2="hardAlpha" operator="out" />
                                    <FeColorMatrix type="matrix" values="0 0 0 0 0.729412 0 0 0 0 0.294118 0 0 0 0 0.188235 0 0 0 1 0" />
                                    <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_59" />
                                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <FeOffset dx="61" dy="-34" />
                                    <FeComposite in2="hardAlpha" operator="out" />
                                    <FeColorMatrix type="matrix" values="0 0 0 0 0.591925 0 0 0 0 0.625961 0 0 0 0 0.555541 0 0 0 1 0" />
                                    <FeBlend mode="normal" in2="effect1_dropShadow_24_59" result="effect2_dropShadow_24_59" />
                                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <FeOffset dx="-10" dy="4" />
                                    <FeComposite in2="hardAlpha" operator="out" />
                                    <FeColorMatrix type="matrix" values="0 0 0 0 0.964706 0 0 0 0 0.831373 0 0 0 0 0.631373 0 0 0 1 0" />
                                    <FeBlend mode="normal" in2="effect2_dropShadow_24_59" result="effect3_dropShadow_24_59" />
                                    <FeBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_24_59" result="shape" />
                                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <FeOffset dx="-94" dy="63" />
                                    <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <FeColorMatrix type="matrix" values="0 0 0 0 0.380392 0 0 0 0 0.745098 0 0 0 0 0.670588 0 0 0 1 0" />
                                    <FeBlend mode="normal" in2="shape" result="effect4_innerShadow_24_59" />
                                </Filter>
                            </Defs> {/*Outros filtros e sombreados adicionais*/}
                        </Svg>
                        <View style={styles.svgTextWrapper}>
                            <Text style={styles.svgText}>
                                Organize sua vida{'\n'}financeira de forma inteligente!
                            </Text>
                        </View> {/*Container para o texto posicionado sobre o SVG*/}
                    </View>
                    <Image
                        source={require('../../src/assets/images/conta.png')}
                        style={{ width: 400, height: 300, alignSelf: 'center', marginVertical: 16, transform: [{ rotate: '-15deg' }] }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ alignItems: "center", width: "100%", marginTop: 32 }}> {/*Container centralizado para botões e elementos abaixo*/}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}
                            onPress={() => router.push('/auth/login')}>
                            {/*Navega para tela de login ao clicar*/}
                            <Text style={styles.button}>Login</Text>
                            <Svg width={20} height={20} viewBox="0 0 20 20" style={{ marginLeft: 8 }}>
                                <Path d="M5 10h10M10 5l5 5-5 5" stroke="#070000" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </TouchableOpacity> {/*Ícone SVG de seta para indicar ação de avançar*/}
                    </View>

                    <View style={[styles.line1Container, { marginVertical: 24, alignItems: 'center', height: 120, justifyContent: 'flex-end' }]}> {/*Ícone pequeno da logo*/}
                        <Image
                            style={styles.logo_icon}
                            source={require('../../src/assets/images/logo_icon.png')}
                            resizeMode="contain"
                        />
                        <Svg style={styles.line1} width="270" height="18" viewBox="0 0 270 18" fill="none" >
                            <G filter="url(#filter0_d_17_43)">
                                <Path d="M7 7H263" stroke="#241618" strokeWidth="14" strokeLinecap="round" />
                            </G>
                            <Defs>
                                <Filter id="filter0_d_17_43" x="0" y="0" width="270" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <FeOffset dy="4" />
                                    <FeComposite in2="hardAlpha" operator="out" />
                                    <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_43" />
                                    <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_43" result="shape" />
                                </Filter>
                            </Defs>
                        </Svg>
                    </View> {/*Linha SVG decorativa abaixo da logo*/}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}
                            onPress={() => router.push('/auth/register')}>
                                {/*Navega para tela de cadastro ao clicar */}
                            <Text style={styles.button}>Cadastre-se</Text>
                            <Svg width={20} height={20} viewBox="0 0 20 20" style={{ marginLeft: 8 }}>
                                <Path d="M5 10h10M10 5l5 5-5 5" stroke="#070000" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={require('../../src/assets/images/carteira.png')}
                        style={{ width: 300, height: 200, alignSelf: 'center', marginVertical: 16, transform: [{ rotate: '20deg' }] }}
                        resizeMode="contain"
                    />

                    <Svg style={styles.svg3} width="412" height="254" viewBox="0 0 412 254" fill="none" >
                        <Path fillRule="evenodd" clipRule="evenodd" d="M360.068 155.518C376.58 153.116 393.102 140.428 408.463 146.744C423.573 152.958 430.013 170.894 434.51 186.13C438.505 199.665 433.311 213.535 432.322 227.575C431.405 240.587 432.961 253.454 428.89 265.891C424.119 280.465 420.089 297.298 406.78 305.595C393.443 313.908 375.942 308.339 360.068 308.793C343.682 309.262 326.017 316.063 311.729 308.313C297.434 300.56 294.418 282.388 286.176 268.714C277.908 254.997 261.845 243.397 263.066 227.575C264.294 211.649 281.91 202.29 292.261 189.824C301.037 179.255 306.996 165.987 319.429 159.697C331.702 153.488 346.364 157.512 360.068 155.518Z" fill="#4FBE9F" />
                        <Path fillRule="evenodd" clipRule="evenodd" d="M-52.3443 42.9296C-28.7941 32.0921 -1.77211 19.9773 21.8903 27.5869C45.3071 35.1175 49.4873 62.7967 64.5684 80.5275C80.1412 98.8363 106.147 109.919 111.576 133.03C117.591 158.636 113.679 188.756 95.0581 210.331C76.6992 231.604 45.2619 238.023 16.793 242.854C-7.59405 246.993 -30.0609 239.445 -53.907 235.613C-80.7366 231.302 -116.453 239.429 -131.269 219.065C-146.19 198.555 -125.041 169.995 -120.071 144.67C-116.112 124.497 -117.042 103.9 -105.163 86.0554C-92.6254 67.2207 -73.7973 52.802 -52.3443 42.9296Z" fill="#893426" />
                        <Path fillRule="evenodd" clipRule="evenodd" d="M223.958 300.94C210.995 310.052 206.57 329.005 191.904 334.919C176.6 341.092 157.884 341.095 143.684 333.315C129.719 325.663 127.879 306.573 117.799 294.315C107.645 281.967 84.9733 277.226 84.3122 261.113C83.627 244.412 107.362 236.651 114.81 221.471C121.382 208.078 116.444 191.3 124.687 178.828C134.078 164.622 147.757 152.699 163.875 147.244C181.001 141.447 203.287 136.218 216.814 147.647C231.525 160.076 218.063 188.008 229.994 203.106C241.651 217.859 271.048 211.051 279.997 227.605C288.334 243.027 282.028 264.978 271.142 279.224C260.445 293.222 238.389 290.797 223.958 300.94Z" fill="#744F38" />
                    </Svg>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} //SVG decorativo final colorido

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,198,1)",
    },
    telainicialContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
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
    mensagemdeboasvindasContainer: {
        position: "relative",
        marginTop: -20,
        flexShrink: 0,
        height: 919,
        width: 412,
        alignItems: "center",
        justifyContent: "center",
    },
    vector: {
        position: "absolute",
        flexShrink: 0,
        top: 250,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "visible"
    },
    bemvindo: {
        position: "absolute",
        flexShrink: 0,
        top: 310,
        width: 426,
        height: 130,
        textAlign: "center",
        color: "rgba(116, 79, 56, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 65,
        fontWeight: "500",
        textShadowColor: "rgba(24, 16, 10, 1)",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 0.5
    },
    ao: {
        position: "absolute",
        flexShrink: 0,
        top: 365,
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
        top: 55,
        width: 383,
        height: 187,
        marginLeft: 70,
        marginBottom: 100,
        marginTop: 100,
    },
    telainicialintroducaoContainer: {
        marginTop: 700,
        alignItems: "center",
        width: "100%",
    },
    vectorContainer2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 24,
        width: '100%',
        height: 640,
        position: 'relative',
    },
    vector2: {
        width: 640,
        height: 640,
    },
    svgTextWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 500,
        height: 460,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        paddingHorizontal: 16,
    },
    svgText: {
        marginTop: 240,
        right: 55,
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 40,
        fontWeight: "400",
    },
    buttonContainer: {
        position: "relative",
        flexShrink: 0,
        height: 71,
        width: 293,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 8,
        marginVertical: 32,
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 0,
        elevation: 8,
    },
    button: {
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Anonymous Pro",
        fontSize: 32,
        fontWeight: "400",
        lineHeight: 35,
    },
    logo_icon: {
        width: 170,
        height: 170,
        marginBottom: -95.5,
        alignSelf: 'center',
        zIndex: 1,
        transform: [{ rotate: '-30deg' }],
    },
    line1Container: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column",
        width: 270,
        height: 110,

    },
    line1: {
        position: "relative",
        marginTop: 0,
        zIndex: 0,
        marginVertical: 32,
    },
    svg3: {
        position: "relative",
        marginBottom: -50,
        flexShrink: 0,
        height: 366,
        width: 615
    },
});

export default TelaInicial;
//Estilos e layout dos campos