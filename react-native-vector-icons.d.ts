// Tipagem para suporte ao react-native-vector-icons
// Este arquivo é usado para informar ao TypeScript sobre os módulos de ícones do React Native
// Importa o módulo 'react-native-vector-icons/Icon' para tipos de ícones
declare module 'react-native-vector-icons/MaterialIcons' {
    import { IconProps } from 'react-native-vector-icons/Icon';
    import { ComponentType } from 'react';
    const MaterialIcons: ComponentType<IconProps>;
    export default MaterialIcons;
}