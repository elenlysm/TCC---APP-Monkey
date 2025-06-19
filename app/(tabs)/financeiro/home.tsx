import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
//Importação de componentes personalizados

export default function HomeScreen() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    //Estado que controla a abertura do menu lateral (drawer)

    return (
        <SafeAreaView style={styles.container}>
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
            <Header/> {/*Menu lateral de navegação*/}
            <MenuFechado />

            <Text style={styles.balance} accessibilityLabel="Saldo disponível">
                Saldo: R$ 0,00
            </Text>
            {/*Exibição do saldo disponível do usuário*/}

            <Text style={styles.sectionTitle}>Transações recentes</Text>
            {/*Título da seção de transações*/}

            <View style={styles.transactionsPlaceholder}>
                <Text style={styles.placeholderText}>Nenhuma transação encontrada.</Text>
            </View>{/*Placeholder exibido quando não há transações cadastradas*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    balance: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
    transactionsPlaceholder: { alignItems: 'center', marginTop: 32 },
    placeholderText: { color: '#888' },
});
//Estilos e layout dos campos
