import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
    user: string | null;
    token: string | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tentar recuperar token e usuário ao iniciar o app
        const loadStorageData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('@openfinance:token');
                const storedUser = await AsyncStorage.getItem('@openfinance:user');
                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(storedUser);
                }
            } catch (error) {
                console.log('Erro ao carregar dados do AsyncStorage', error);
            } finally {
                setLoading(false);
            }
        };

        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        setLoading(true);
        try {
            // Simulação chamada à API OpenFinance 
            const response = await fetch('https://api.openfinance.com.br/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Usuário ou senha inválidos');
            }

            const data = await response.json();
            // supondo que o token e usuário venham assim
            const { token, user } = data;

            setToken(token);
            setUser(user.email);

            await AsyncStorage.setItem('@openfinance:token', token);
            await AsyncStorage.setItem('@openfinance:user', user.email);

        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('@openfinance:token');
        await AsyncStorage.removeItem('@openfinance:user');
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
