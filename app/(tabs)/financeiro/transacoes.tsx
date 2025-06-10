import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

export default function TransacoesScreen() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [transacoes, setTransacoes] = useState<{ id: string; descricao: string; valor: number }[]>([]);

    const adicionarTransacao = async () => {
        await addDoc(collection(db, 'transacoes'), { descricao, valor: parseFloat(valor) });
        carregarTransacoes();
    };

    const carregarTransacoes = async () => {
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
    };

    return (
        <View>
            <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
            <TextInput placeholder="Valor" value={valor} keyboardType="numeric" onChangeText={setValor} />
            <Button title="Adicionar" onPress={adicionarTransacao} />
            <FlatList
                data={transacoes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text>{item.descricao}: R$ {item.valor}</Text>}
            />
        </View>
    );
}
