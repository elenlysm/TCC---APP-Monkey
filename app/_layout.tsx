import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Slot } from 'expo-router';
import NavigationDrawer from './components/NavigationDrawer';

export default function Layout() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <View style={styles.container}>
            <NavigationDrawer isOpen={isDrawerOpen} closeDrawer={() => setDrawerOpen(false)} />

            <View style={styles.content}>
                <TouchableOpacity onPress={() => setDrawerOpen(prev => !prev)} style={styles.menuButton}>
                    <Text>☰</Text>
                </TouchableOpacity>

                <Slot />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 },
    menuButton: {
        padding: 10,
        backgroundColor: '#eee',
    },
});
