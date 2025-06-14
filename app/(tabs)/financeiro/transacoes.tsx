import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, Text, TextInput } from 'react-native';
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
import { db } from '../../../src/services/firebaseConfig';
//Importação de componentes personalizados (React e funções Firebase).

export default function TransacoesScreen() {
    // Estados para os campos de entrada e lista de transações
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
//Estados para os campos de entrada do formulário.

    const [transacoes, setTransacoes] = useState<{ id: string; descricao: string; valor: number }[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
//Estado que armazena as transações e menu lateral.

    useEffect(() => {
        carregarTransacoes();
    }, []);
//Carrega as transações.

    const adicionarTransacao = async () => {
        if (!descricao.trim() || !valor.trim() || isNaN(Number(valor))) {
            Alert.alert('Atenção', 'Preencha a descrição e um valor válido.');
            return;
        }
//Função para adicionar transações ao banco e valida se os campos estão preenchidos.

        try {
            await addDoc(collection(db, 'transacoes'), { descricao, valor: parseFloat(valor) });
            setDescricao(''); //Limpa campo de descrição.
            setValor('');     //Limpa campo de valor.
            carregarTransacoes(); //Atualiza a lista.
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a transação.');
        }
    };
//Adiciona documento na coleção "Transações".

    const carregarTransacoes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'transacoes'));
            const lista = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    descricao: data.descricao ?? '',
                    valor: typeof data.valor === 'number' ? data.valor : parseFloat(data.valor) || 0
                };
            });
            setTransacoes(lista);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as transações.');
        }
    };
//Carrega as transações e atualizar o estado com a lista obtida.

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
            <Header />
            {/*Campo para descrição da transação.*/}
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                accessibilityLabel="Campo de descrição"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
            />
            {/*Campo para valor da transação.*/}
            <TextInput
                placeholder="Valor"
                value={valor}
                keyboardType="numeric"
                onChangeText={setValor}
                accessibilityLabel="Campo de valor"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
            />
            {/*Botão para adicionar transação.*/}
            <Button title="Adicionar" onPress={adicionarTransacao} accessibilityLabel="Botão adicionar transação" />
            {/*Lista de transações.*/}
            <FlatList
                data={transacoes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>
                        {item.descricao}: R$ {item.valor.toFixed(2)}
                    </Text>
                )}
                ListEmptyComponent={
                    <Text style={{ color: '#888', marginTop: 16 }}>
                        Nenhuma transação encontrada.
                    </Text>
                }
            />
            <MenuFechado />
        </SafeAreaView>
    );
}
//Estilos e layout dos campos.
