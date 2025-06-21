import { Stack } from "expo-router";
import React from "react";
//Importa o componente Stack do Expo Router + Importa o React para uso de JSX

export default function AuthLayout(){ //Define e exporta o componente AuthLayout, que configura a navegação das telas de autenticação
    return(
        <Stack
            screenOptions={{
                headerShown: false
            }}
        />
    );
}  //Renderiza uma pilha de telas (stack), com configurações personalizadas