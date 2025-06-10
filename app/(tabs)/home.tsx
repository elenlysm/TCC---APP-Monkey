import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Tela de dashboard inicial do app
export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Saldo do usuário, com acessibilidade */}
            <Text style={styles.balance} accessibilityLabel="Saldo disponível">
                Saldo: R$ 0,00
            </Text>
            {/* Título da seção de transações */}
            <Text style={styles.sectionTitle}>Transações recentes</Text>
            {/* Placeholder para lista de transações */}
            <View style={styles.transactionsPlaceholder}>
                <Text style={styles.placeholderText}>Nenhuma transação encontrada.</Text>
            </View>
            {/* 
                Futuramente, substitua o bloco acima por uma FlatList ou componente de lista 
                para exibir as transações do usuário.
            */}
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
