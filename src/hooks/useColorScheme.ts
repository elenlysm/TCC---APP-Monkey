import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme() {
    return _useColorScheme() ?? 'light';
}

//Hook obtem o tema do sistema ('light', 'dark' ou null) - Se não houver valor
//(null ou undefined), retorna 'light' como padrão