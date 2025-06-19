import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
import { db } from 'src/services/firebaseConfig';

export default function CoabitacaoScreen() { //Tela para criação e listagem de grupos de coabitação

    const [grupo, setGrupo] = useState('');
    //Estado para o nome do grupo digitado.

    type Grupo = { id: string; nome: string }; //Tipo para representar um grupo
    const [grupos, setGrupos] = useState<Grupo[]>([]); //Estado com a lista de grupos buscados da DB
    const [drawerOpen, setDrawerOpen] = useState(false); //Estado para controlar o menu lateral (drawer)

    useEffect(() => {
        carregarGrupos();
    }, []);
    //Carrega os grupos ao abrir a tela
    
    const criarGrupo = async () => {
        if (!grupo.trim()) { //Verifica se o campo está vazio
            Alert.alert('Atenção', 'Digite o nome do grupo.');
            return;
        }
        try {
            await addDoc(collection(db, 'transacoes'), { nome: grupo }); //Adiciona grupo na coleção 'transações'
            setGrupo(''); //Limpa o campo de texo
            carregarGrupos(); //Atualiza a lista de grupos exibidos
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o grupo.'); //Mostra erro, se falhar
        }
    };
    //Função para criar um novo grupo no DB

    const carregarGrupos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'transacoes')); //Busca documentos da coleção
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome as string
            }));
            setGrupos(lista); //Atualiza estado com a lista de grupos
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os grupos.');
        }
    };
    //Função para carregar todos os grupos da DB

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {/*SafeAreaView protege o conteúdo em telas com notch (iPhone etc.)*/}
            <View style={{ flex: 1 }}>
                <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
                <Header /> {/*Menu lateral com controle de visibilidade*/}

                <TextInput
                    placeholder="Nome do grupo"
                    value={grupo}
                    onChangeText={setGrupo}
                    accessibilityLabel="Campo para nome do grupo"
                    style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
                /> {/*Campo de entrada para nome do grupo*/}

                <Button title="Criar Grupo" onPress={criarGrupo} accessibilityLabel="Botão para criar grupo" />
                {/*Botão para criar novo grupo*/}

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
                {/*Lista de grupos já cadastrados*/}
                <MenuFechado />
            </View>
        </SafeAreaView>
    );
}
