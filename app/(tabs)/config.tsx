import Header from '@/components/Header';
import MenuFechado from '@/components/MenuFechado';
import NavigationDrawer from '@/components/NavigationDrawer';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { G, Path, Svg } from 'react-native-svg'; // Removi Defs pois filtros SVG não são suportados no React Native

export default function Config() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
            <Header />
            <View style={styles.androidCompact2}>
                <View style={styles.configuracoes}>

                    {/* SVG decorativo - filtros removidos para evitar warnings/erros */}
                    <Svg style={styles.vector} width="412" height="206" viewBox="0 0 412 206" fill="none">
                        <G>
                            <Path d="..." fill="#1E8087" />
                            <Path d="..." stroke="#893426" strokeWidth="11" />
                        </G>
                    </Svg>

                    {/* Conteúdo principal */}
                    <View style={styles.buildingBlocksContent}>
                        <View style={styles.content}>
                            <Text style={styles.titulo}>Configurações</Text>
                            <View style={styles.iconButton}>
                                {/* Ícone SVG pode ser adicionado aqui */}
                            </View>
                        </View>
                    </View>

                    {/* Cabeçalho */}
                    <View style={styles.header}>
                        <ImageBackground
                            style={styles.logo}
                            source={{ uri: 'https://dummyimage.com/63x63/000/fff.png' }}
                            accessibilityLabel="Logo do aplicativo"
                        />
                        {/* Menu de opções - se for interativo, use TouchableOpacity */}
                        <TouchableOpacity style={styles.menu} accessibilityLabel="Menu de opções">
                            {/* Menu Icon pode ser adicionado aqui */}
                        </TouchableOpacity>
                        {/* Botão de notificações */}
                        <TouchableOpacity style={styles.bell} accessibilityLabel="Notificações">
                            {/* Bell Icon pode ser adicionado aqui */}
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <MenuFechado />
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
