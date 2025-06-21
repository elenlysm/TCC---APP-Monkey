import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import React from "react";
import 'react-native-reanimated';
import { Colors } from "../../src/constants/Colors";
import { useColorScheme } from "../../src/hooks/useColorScheme";
//Importações personalizadas de fontes e cores + reac native animações

export default function TabsLayout() {
    const colorScheme = useColorScheme(); //Obtém o esquema de cores atual (light ou dark)

    const [loaded] = useFonts({
        AnonymousPro: require ('../../src/assets/fonts/AnonymousPro-Regular.ttf'),
    }); //Carrega a fonte personalizada AnonymousPro

    if (!loaded){
        return null;
    }

    return(
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme ?? `light`].tint,
            tabBarInactiveTintColor: Colors[colorScheme ?? `light`].tabIconDefault,
            tabBarStyle: {
                backgroundColor:Colors[colorScheme ?? `light`].background
            },
        }}
        /> //Retorna o componente de abas configurado
    );
}
