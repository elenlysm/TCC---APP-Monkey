import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { G, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeComposite, FeBlend } from 'react-native-svg';

export default function MenuFechado() {
    return (
        <View style={styles.container}>
            {/* SVG decorativo */}
            <Svg style={styles.vector} width="412" height="206" viewBox="0 0 412 206" fill="none">
                <G filter="url(#filter0_d_30_154)">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M185.053 -276.344C228.066 -243.263 267.518 -210.552 305.302 -172.104C358.485 -117.986 440.056 -75.1944 451.675 -5.03756C463.255 64.8779 421.671 136.83 362.379 172.519C305.109 206.992 224.932 176.333 153.651 174.353C103.692 172.965 53.8593 182.551 6.40464 162.632C-38.4487 143.806 -68.3398 103.884 -100.273 67.771C-130.572 33.5053 -163.477 -0.256977 -174.804 -42.2954C-186.325 -85.0518 -187.418 -132.804 -163.548 -167.053C-140.63 -199.935 -79.7529 -188.021 -52.5703 -217.677C-9.91706 -264.211 -31.5588 -365.567 33.0259 -381.513C90.3235 -395.659 135.257 -314.642 185.053 -276.344Z"
                        fill="#1E8087"
                    />
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M185.053 -276.344C228.066 -243.263 267.518 -210.552 305.302 -172.104C358.485 -117.986 440.056 -75.1944 451.675 -5.03756C463.255 64.8779 421.671 136.83 362.379 172.519C305.109 206.992 224.932 176.333 153.651 174.353C103.692 172.965 53.8593 182.551 6.40464 162.632C-38.4487 143.806 -68.3398 103.884 -100.273 67.771C-130.572 33.5053 -163.477 -0.256977 -174.804 -42.2954C-186.325 -85.0518 -187.418 -132.804 -163.548 -167.053C-140.63 -199.935 -79.7529 -188.021 -52.5703 -217.677C-9.91706 -264.211 -31.5588 -365.567 33.0259 -381.513C90.3235 -395.659 135.257 -314.642 185.053 -276.344Z"
                        stroke="#893426"
                        strokeWidth="11"
                    />
                </G>
                <Defs>
                    <Filter
                        id="filter0_d_30_154"
                        x="-188.226"
                        y="-388.658"
                        width="711.344"
                        height="593.964"
                        filterUnits="userSpaceOnUse"
                    >
                        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                        <FeColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <FeOffset dx="64" dy="11" />
                        <FeComposite in2="hardAlpha" operator="out" />
                        <FeColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.729412 0 0 0 0 0.333333 0 0 0 1 0" />
                        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_154" />
                        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_30_154" result="shape" />
                    </Filter>
                </Defs>
            </Svg>

            {/* Header container flex */}
            <View style={styles.header}>
                <View style={styles.block}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/icon.png')}
                        resizeMode="contain"
                    />
                </View>

                {/* Menu Icon */}
                <View style={styles.menu}>
                    <Svg width="34" height="25" viewBox="0 0 34 25" fill="none">
                        <Path
                            d="M2 12.5H32M2 2.5H32M2 22.5H32"
                            stroke="#F3F3F3"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>

                {/* Notification Bell */}
                <View style={styles.bell}>
                    <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                        <Path
                            d="M12.73 21C12.5542 21.3031 12.3018 21.5547 11.9982 21.7295C11.6946 21.9044 11.3504 21.9965 11 21.9965C10.6496 21.9965 10.3054 21.9044 10.0018 21.7295C9.69816 21.5547 9.44581 21.3031 9.27 21M17 8C17 6.4087 16.3679 4.88258 15.2426 3.75736C14.1174 2.63214 12.5913 2 11 2C9.4087 2 7.88258 2.63214 6.75736 3.75736C5.63214 4.88258 5 6.4087 5 8C5 15 2 17 2 17H20C20 17 17 15 17 8Z"
                            stroke="#F3F3F3"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: 'transparent', // fundo transparente para mostrar o background pai
    },
    vector: {
        position: 'absolute',
        top: -294,
        left: -183,
        width: 648,
        height: 498,
        overflow: 'visible',
        zIndex: -1, // para ficar atrás do conteúdo
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 63,
        height: 63,
    },
    menu: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
