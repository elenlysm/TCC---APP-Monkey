import { Slot } from 'expo-router';
import React from 'react';

import { useFonts } from 'expo-font';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    AnonymousPro: require('../src/assets/fonts/AnonymousPro-Regular.ttf'),
  }); 
  if (!loaded) {
    return null;
  } 
  return <Slot />;
}