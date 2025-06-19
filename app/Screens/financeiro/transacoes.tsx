import { useEffect, useState } from 'react';
import { db } from 'src/services/firebaseConfig';
import { Alert, FlatList, SafeAreaView, Text, TextInput } from 'react-native';
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
import { collection } from 'firebase/firestore';
//Importação de componentes personalizados (React + Firebase).

export default function TransacoesScreen() {
//Componente principal da tela de transações
    const [descricao, setDescricao] = useState(''); //Armazena o texto da descrição
    const [valor, setValor] = useState(''); //Armaena o valor da transaçãa

    const [transacoes, setTransacoes] = useState<{ id: string; descricao: string; valor: number }[]>([]);
    //Estado para armazenar a lista de transações recuperadas do Firestore
    const [drawerOpen, setDrawerOpen] = useState(false);
    //Estado para controlar a visibilidade do menu lateral(drawer)

    useEffect(() => {
        importarTransacoes();
    }, []);
    //Carrega as transações

    const importarTransacoes = async() =>{
    try{
        await (collection(db,'transacoes'),{
            descricao, valor: parseFloat(valor)
        });
        setDescricao('')
        setValor('')
        importarTransacoes();
    } catch (error){
        Alert.alert('Erro', 'Não foi possível importar a transação');
    }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)}/> {/*Menu lateral de navegação*/}
            <Header/>
            
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                accessibilityLabel="Campo de descrição"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
            /> {/*Campo de entrada para a descrição da transação*/}
            <TextInput
                placeholder="Valor"
                value={valor}
                keyboardType="numeric"
                onChangeText={setValor}
                accessibilityLabel="Campo de valor"
                style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 }}
            /> {/* Campo de entrada para o valor da transação */}
        
            <FlatList
                data={transacoes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>
                        {item.descricao}: R$ {item.valor.toFixed(2)}
                    </Text>
                )} //Lista de transações cadastradas
                ListEmptyComponent={ 
                    <Text style={{ color: '#888', marginTop: 16 }}> 
                        Nenhuma transação encontrada.
                    </Text>
                } //Mensagem exibida caso a lista esteja vazia
            />
            <MenuFechado />
        </SafeAreaView>
    );
}
