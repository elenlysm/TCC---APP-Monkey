import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
    isOpen: boolean;
    closeDrawer: () => void;
};

const NavigationDrawer = ({ isOpen, closeDrawer }: Props) => {
    const router = useRouter();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withTiming(isOpen ? 0 : -SCREEN_WIDTH * 0.6, { duration: 300 }) }
        ]
    }));

    const items = [
        { name: 'Home', path: '/home', icon: 'home' },
        { name: 'Transações', path: '/transacoes', icon: 'list' },
        { name: 'Orçamentos', path: '/orcamentos-e-metas', icon: 'attach-money' },
        { name: 'Relatório', path: '/relatorios-e-analises', icon: 'bar-chart' },
        { name: 'Coabitação', path: '/coabitacao', icon: 'group' },
        { name: 'Configurações', path: '/configuracoes', icon: 'settings' },
    ];

    // Overlay para fechar ao clicar fora do drawer
    if (!isOpen) return null;

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.overlayTouchable} onPress={closeDrawer} accessible accessibilityLabel="Fechar menu lateral" />
            <Animated.View style={[styles.container, animatedStyle]}>
                {items.map(item => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.item}
                        onPress={() => {
                            router.push(item.path as any);
                            closeDrawer();
                        }}
                        accessible
                        accessibilityLabel={`Ir para ${item.name}`}
                    >
                        <Icon name={item.icon} size={24} color="#333" />
                        <Text style={styles.label}>{item.name}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        // TODO: Adicione aqui sua lógica real de logout
                        console.log('Logout...');
                        closeDrawer();
                    }}
                    accessible
                    accessibilityLabel="Sair da conta"
                >
                    <Icon name="exit-to-app" size={24} color="#333" />
                    <Text style={styles.label}>Sair</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
    },
    overlayTouchable: {
        flex: 1,
    },
    container: {
        width: SCREEN_WIDTH * 0.6,
        backgroundColor: '#eee',
        padding: 20,
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    item: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    label: { marginLeft: 10 },
});

export default NavigationDrawer;
