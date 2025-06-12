import Header from '@/components/Header';
import MenuFechado from '@/components/MenuFechado';
import NavigationDrawer from '@/components/NavigationDrawer';
import { db } from '@/services/firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';


export default function CoabitacaoScreen() {
    // Estado para o nome do grupo digitado
    const [grupo, setGrupo] = useState('');
    // Tipo e estado para a lista de grupos
    type Grupo = { id: string; nome: string };
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Carrega os grupos ao abrir a tela
    useEffect(() => {
        carregarGrupos();
    }, []);

    // Função para criar um novo grupo no Firestore
    const criarGrupo = async () => {
        if (!grupo.trim()) {
            Alert.alert('Atenção', 'Digite o nome do grupo.');
            return;
        }
        try {
            // Adicionar grupo
            await addDoc(collection(db, 'transacoes'), { nome: grupo });
            setGrupo(''); // Limpa o campo após criar
            carregarGrupos(); // Atualiza a lista
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o grupo.');
        }
    };

    // Função para buscar todos os grupos do Firestore
    const carregarGrupos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'transacoes'));
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome as string
            }));
            setGrupos(lista);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os grupos.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <View style={{ flex: 1 }}>
                <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
                <Header />
                {/* Campo de texto para nome do grupo */}
                <TextInput
                    placeholder="Nome do grupo"
                    value={grupo}
                    onChangeText={setGrupo}
                    accessibilityLabel="Campo para nome do grupo"
                    style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
                />
                {/* Botão para criar grupo */}
                <Button title="Criar Grupo" onPress={criarGrupo} accessibilityLabel="Botão para criar grupo" />
                {/* Lista de grupos */}
                <FlatList
                    data={grupos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text>{item.nome}</Text>}
                    ListEmptyComponent={
                        <Text style={{ color: '#888', marginTop: 16 }}>
                            Nenhum grupo encontrado.
                        </Text>
                    }
                />
                <MenuFechado />
            </View>
        </SafeAreaView>
    );
}
