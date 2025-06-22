import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';

export const saveToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
        console.error('Erro ao salvar token:', error);
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error('Erro ao buscar token:', error);
        return null;
    }
};

export const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error('Erro ao deletar token:', error);
    }
};
