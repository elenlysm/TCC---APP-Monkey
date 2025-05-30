// app/navigation/index.tsx
import TelaInicial from '@/screens/tela-inicial';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={TelaInicial} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
