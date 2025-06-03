import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Svg, G, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeComposite, FeBlend, Line } from 'react-native-svg';

export default function OrcamentoEMetas() {
    return (
        <View style={styles.container}>
            {/* Fundo superior */}
            <Svg style={styles.vector} width="412" height="206" viewBox="0 0 412 206" fill="none">
                <G filter="url(#filter0_d)">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M185.053 -276.344C228.066 -243.263 267.518 -210.552 305.302 -172.104C358.485 -117.986 440.056 -75.1944 451.675 -5.03756C463.255 64.8779 421.67 136.83 362.379 172.519C305.109 206.992 224.931 176.333 153.651 174.353C103.692 172.965 53.8593 182.551 6.40458 162.632C-38.4488 143.806 -68.3399 103.884 -100.273 67.771C-130.572 33.5053 -163.477 -0.256977 -174.804 -42.2954C-186.325 -85.0518 -187.418 -132.804 -163.548 -167.053C-140.63 -199.935 -79.753 -188.021 -52.5703 -217.677C-9.91712 -264.211 -31.5589 -365.567 33.0258 -381.513C90.3235 -395.659 135.257 -314.642 185.053 -276.344Z"
                        fill="#1E8087"
                        stroke="#893426"
                        strokeWidth="11"
                    />
                </G>
                <Defs>
                    <Filter id="filter0_d" x="-188.226" y="-388.658" width="711.345" height="593.965" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <FeOffset dx="64" dy="11" />
                        <FeComposite in2="hardAlpha" operator="out" />
                        <FeColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.73 0 0 0 0 0.33 0 0 0 1 0" />
                        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </Filter>
                </Defs>
            </Svg>

            {/* Cabeçalho */}
            <View style={styles.header}>
                <ImageBackground
                    style={styles.profileImage}
                    source={{ uri: 'https://dummyimage.com/63x63/000/fff.png' }}
                />
                <Text style={styles.title}>Orçamento e Metas</Text>
            </View>

            {/* Indicadores de progresso */}
            <View style={styles.budgetSection}>
                {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item}</Text>
                        <View style={styles.progressBar}>
                            <View style={styles.progressValue} />
                        </View>
                        <Text style={styles.budgetText}>Limite: R$</Text>
                        <Text style={styles.budgetText}>Gasto: R$</Text>
                        <View style={styles.divider}>
                            <Svg width="379" height="1" viewBox="0 0 379 1" fill="none">
                                <Line x1="0" y1="0.5" x2="379" y2="0.5" stroke="white" />
                            </Svg>
                        </View>
                    </View>
                ))}
            </View>

            {/* Ações */}
            <View style={styles.actions}>
                <Text style={styles.addGoal}>Adicionar Meta ao Orçamento</Text>
                <Text style={styles.summary}>Total de Metas: 0</Text>
                <Text style={styles.summary}>Metas Atingidas: 0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFC6',
        padding: 16,
    },
    vector: {
        position: 'absolute',
        top: -294,
        left: -183,
    },
    header: {
        marginTop: 150,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profileImage: {
        width: 63,
        height: 63,
        borderRadius: 31.5,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1D1B20',
    },
    budgetSection: {
        marginTop: 24,
    },
    itemContainer: {
        marginBottom: 16,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressValue: {
        width: '50%', // valor fictício
        height: '100%',
        backgroundColor: '#1E8087',
    },
    budgetText: {
        fontSize: 12,
        color: '#333',
    },
    divider: {
        marginVertical: 8,
    },
    actions: {
        marginTop: 24,
        alignItems: 'center',
    },
    addGoal: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    summary: {
        fontSize: 14,
        color: '#555',
    },
});
