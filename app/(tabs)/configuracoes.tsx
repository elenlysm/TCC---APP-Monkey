import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Svg, G, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeComposite, FeBlend } from 'react-native-svg';

export default function Configuracoes() {
    return (
        <View style={styles.androidCompact2}>
            <View style={styles.configuracoes}>

                {/* SVG decorativo */}
                <Svg style={styles.vector} width="412" height="206" viewBox="0 0 412 206" fill="none">
                    <G filter="url(#filter0_d)">
                        <Path d="..." fill="#1E8087" />
                        <Path d="..." stroke="#893426" strokeWidth="11" />
                    </G>
                    <Defs>
                        {/* Define your filter here or remove this block if not needed */}
                        {/* Example filter definition: */}
                        {/* 
                        <Filter id="filter0_d" x="0" y="0" width="200%" height="200%">
                            <FeOffset result="offOut" in="SourceAlpha" dx="0" dy="4" />
                            <FeGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
                            <FeBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </Filter>
                        */}
                    </Defs>
                </Svg>

                {/* Conteúdo */}
                <View style={styles.buildingBlocksContent}>
                    <View style={styles.content}>
                        <Text style={styles.titulo}>Configurações</Text>
                        <View style={styles.iconButton}>
                            {/* Ícone SVG */}
                        </View>
                    </View>
                </View>

                {/* Cabeçalho */}
                <View style={styles.header}>
                    <ImageBackground style={styles.logo} source={{ uri: 'https://dummyimage.com/63x63/000/fff.png' }} />
                    <View style={styles.menu}>
                        {/* Menu Icon */}
                    </View>
                    <View style={styles.bell}>
                        {/* Bell Icon */}
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    androidCompact2: {
        flex: 1,
        backgroundColor: '#fff',
    },
    configuracoes: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    vector: {
        position: 'absolute',
        top: 0,
    },
    buildingBlocksContent: {
        marginTop: 40,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 16,
    },
    menu: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 63,
        height: 63,
        borderRadius: 31.5,
        overflow: 'hidden',
    },
    bell: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // ... outros estilos
});
