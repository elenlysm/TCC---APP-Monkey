import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { G, Line, Path, Svg } from 'react-native-svg';

// Import de componentes customizados
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';

export default function OrcamentoEMetas() {
    // Controle do drawer
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <View style={styles.container}>
            {/* Navigation Drawer */}
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />

            {/* Header customizado */}
            <Header />

            {/* SVG decorativo de fundo, sem filtros */}
            <Svg style={styles.vector} width="412" height="206" viewBox="0 0 412 206" fill="none">
                <G>
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M185.053 -276.344C228.066 -243.263 267.518 -210.552 305.302 -172.104C358.485 -117.986 440.056 -75.1944 451.675 -5.03756C463.255 64.8779 421.67 136.83 362.379 172.519C305.109 206.992 224.931 176.333 153.651 174.353C103.692 172.965 53.8593 182.551 6.40458 162.632C-38.4488 143.806 -68.3399 103.884 -100.273 67.771C-130.572 33.5053 -163.477 -0.256977 -174.804 -42.2954C-186.325 -85.0518 -187.418 -132.804 -163.548 -167.053C-140.63 -199.935 -79.753 -188.021 -52.5703 -217.677C-9.91712 -264.211 -31.5589 -365.567 33.0258 -381.513C90.3235 -395.659 135.257 -314.642 185.053 -276.344Z"
                        fill="#1E8087"
                        stroke="#893426"
                        strokeWidth="11"
                    />
                </G>
            </Svg>

            {/* Cabeçalho com imagem de perfil e título */}
            <View style={styles.header}>
                <ImageBackground
                    style={styles.profileImage}
                    source={{ uri: 'https://dummyimage.com/63x63/000/fff.png' }}
                    accessibilityLabel="Foto de perfil do usuário"
                />
                <Text style={styles.title}>Orçamento e Metas</Text>
            </View>

            {/* Indicadores de progresso - estáticos, prontos para dados dinâmicos */}
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

            {/* Ações e resumo das metas */}
            <View style={styles.actions}>
                <Text style={styles.addGoal} accessibilityLabel="Adicionar Meta ao Orçamento">
                    Adicionar Meta ao Orçamento
                </Text>
                <Text style={styles.summary}>Total de Metas: 0</Text>
                <Text style={styles.summary}>Metas Atingidas: 0</Text>
            </View>

            {/* Menu Fechado no rodapé */}
            <MenuFechado />
        </View>
    );
}

// Estilos organizados e prontos para expansão
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
        // gap removido para compatibilidade
    },
    profileImage: {
        width: 63,
        height: 63,
        borderRadius: 31.5,
        marginRight: 12, // Substitui gap
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
        width: '50%', // valor fictício, troque por valor dinâmico depois
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
