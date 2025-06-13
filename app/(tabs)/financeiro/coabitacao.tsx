import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
import { db } from '../../../src/services/firebaseConfig';
//Importação de componentes personalizados.

export default function CoabitacaoScreen() {

    const [grupo, setGrupo] = useState('');
//Estado para o nome do grupo digitado.

    type Grupo = { id: string; nome: string };
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
//Tipo e estado para a lista de grupos.

    useEffect(() => {
        carregarGrupos();
    }, []);
//Carrega os grupos ao abrir a tela.

    const criarGrupo = async () => {
        if (!grupo.trim()) {
            Alert.alert('Atenção', 'Digite o nome do grupo.');
            return;
        }
        try {
            await addDoc(collection(db, 'transacoes'), { nome: grupo }); //Adiciona grupo.
            setGrupo(''); //Limpa o campo após criar.
            carregarGrupos(); //Atualiza a lista.
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o grupo.');
        }
    };
//Função para criar um novo grupo e exibir erro, caso a criação não dê certo.

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
//Função para buscar todos os grupos

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <View style={{ flex: 1 }}>
                <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
                <Header />

                <TextInput
                    placeholder="Nome do grupo"
                    value={grupo}
                    onChangeText={setGrupo}
                    accessibilityLabel="Campo para nome do grupo"
                    style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
                />
{/*Campo de texto para nome do grupo.*/}

                <Button title="Criar Grupo" onPress={criarGrupo} accessibilityLabel="Botão para criar grupo" />
{/*Botão para criar grupo.*/}

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
{/*Lista de grupos.*/}
                <MenuFechado />
            </View>
        </SafeAreaView>
    );
}
