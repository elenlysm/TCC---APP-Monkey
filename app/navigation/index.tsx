import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/cadastro';
import DashboardScreen from '../screens/home';
import TransacoesScreen from '../screens/transacoes';
import CoabitacaoScreen from '../screens/coabitacao';
import RelatoriosScreen from '../screens/relatorios-e-analises';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Transações" component={TransacoesScreen} />
            <Tab.Screen name="Coabitação" component={CoabitacaoScreen} />
            <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Cadastro" component={RegisterScreen} />
                <Stack.Screen name="App" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
