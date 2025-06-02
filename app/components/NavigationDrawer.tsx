import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

type Props = {
    closeDrawer: () => void;
};

const NavigationDrawer = ({ closeDrawer }: Props) => {
    const router = useRouter();

    const items = [
        { name: 'Home', path: '/home', icon: 'home' },
        { name: 'Transacoes', path: '/transacoes', icon: 'list' },
        { name: 'Orcamentos', path: '/orcamentos-e-metas', icon: 'attach-money' },
    ];

    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#eee', height: '100%' },
    item: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    label: { marginLeft: 10 },
});

export default NavigationDrawer;
