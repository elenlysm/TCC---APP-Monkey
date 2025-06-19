import { useFonts } from 'expo-font'; //Hook para carregar fontes customizadas no Expo
import { Tabs } from 'expo-router'; //Componente para navegação em abas
import React from 'react'; //Importação do react
import 'react-native-reanimated'; //Biblioteca para animações

import { Colors } from '../src/constants/Colors'; //Constantes de cores definidas no projeto
import { useColorScheme } from '../src/hooks/useColorScheme'; //Hook customizado para detectar o tema (claro/escuro)

export default function Layout() {
// Obtém o esquema de cores atual do dispositivo (light/dark)
  const colorScheme = useColorScheme();
  
  const [loaded] = useFonts({
    AnonymousPro: require('../src/assets/fonts/AnonymousPro-Regular.ttf'),
  }); //Usa o hook useFonts para carregar a fonte 'AnonymousPro' do arquivo local

  if (!loaded) {
    return null;
  } 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}
    >
    </Tabs>
  );
}