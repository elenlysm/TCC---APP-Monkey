//Tipagem para suporte ao react-native-vector-icons
//Este arquivo é usado para informar ao TypeScript sobre os módulos de ícones do React Native
//Importa o módulo 'react-native-vector-icons/Icon' para tipos de ícones
declare module 'react-native-vector-icons/MaterialIcons' {
    import { ComponentType } from 'react';
    import { IconProps } from 'react-native-vector-icons/Icon';
    const MaterialIcons: ComponentType<IconProps>;
    export default MaterialIcons;
}

declare module 'react-native-vector-icons/FontAwesome' {
    import { ComponentType } from 'react';
    import { IconProps } from 'react-native-vector-icons/Icon';
    const FontAwesome: ComponentType<IconProps>;
    export default FontAwesome;
}