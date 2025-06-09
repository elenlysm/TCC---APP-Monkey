import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export default function CoabitacaoScreen() {
    const [grupo, setGrupo] = useState('');
    type Grupo = { id: string; nome: string };
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    const criarGrupo = async () => {
        await addDoc(collection(db, 'grupos'), { nome: grupo });
        carregarGrupos();
    };

    const carregarGrupos = async () => {
        const querySnapshot = await getDocs(collection(db, 'grupos'));
        const lista = querySnapshot.docs.map(doc => ({
            id: doc.id,
            nome: doc.data().nome as string
        }));
        setGrupos(lista);
    };

    return (
        <View>
            <TextInput placeholder="Nome do grupo" value={grupo} onChangeText={setGrupo} />
            <Button title="Criar Grupo" onPress={criarGrupo} />
            <FlatList
                data={grupos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text>{item.nome}</Text>}
            />
        </View>
    );
}
