import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import React from "react";
import 'react-native-reanimated';
import { Colors } from "../../src/constants/Colors";
import { useColorScheme } from "../../src/hooks/useColorScheme";

export default function TabsLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        AnonymousPro: require ('../../src/assets/fonts/AnonymousPro-Regular.ttf'),
    });

    if (!loaded){
        return null;
    }

    return(
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme ?? `light`].tint,
            tabBarInactiveTintColor: Colors[colorScheme ?? `ligth`].tabIconDefault,
            tabBarStyle: {
                backgroundColor:Colors[colorScheme ?? `light`].background
            },
        }}
        />
    );
}
