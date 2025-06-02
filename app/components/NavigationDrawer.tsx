import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, usePathname } from 'expo-router';

const NavigationDrawer = () => {
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: 'Transacoes', icon: 'list' },
        { name: 'Orcamentos', icon: 'attach-money' },
    ];


    return (
        <View style={styles.container}>
            {items.map(item => {
                const isActive = pathname === item.path;

                return (
                    <TouchableOpacity
                        key={item.name}
                        style={[styles.item, isActive && styles.activeItem]}
                        onPress={() => router.push(item.path)}
                    >
                        <Icon
                            name={item.icon}
                            size={24}
                            color={isActive ? '#007bff' : '#333'}
                        />
                        <Text style={[
                            styles.label,
                            isActive && { color: '#007bff', fontWeight: 'bold' }
                        ]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}

            <TouchableOpacity style={styles.item} onPress={() => console.log('Logout...')}>
                <Icon name="exit-to-app" size={24} color="#333" />
                <Text style={styles.label}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#eee', height: '100%' },
    item: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    activeItem: { backgroundColor: '#ddd' },
    label: { marginLeft: 10 },
});

export default NavigationDrawer;
