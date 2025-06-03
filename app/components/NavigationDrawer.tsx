import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
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
        { name: 'Transacoes', path: '/transacoes', icon: 'list' },
        { name: 'Orcamentos', path: '/orcamentos-e-metas', icon: 'attach-money' },
    ];

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {items.map(item => (
                <TouchableOpacity
                    key={item.name}
                    style={styles.item}
                    onPress={() => {
                        router.push(item.path);
                        closeDrawer();
                    }}
                >
                    <Icon name={item.icon} size={24} color="#333" />
                    <Text style={styles.label}>{item.name}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.item} onPress={() => console.log('Logout...')}>
                <Icon name="exit-to-app" size={24} color="#333" />
                <Text style={styles.label}>Sair</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.6,
        backgroundColor: '#eee',
        padding: 20,
        zIndex: 10,
    },
    item: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    label: { marginLeft: 10 },
});

export default NavigationDrawer;
