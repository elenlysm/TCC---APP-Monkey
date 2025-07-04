//app/firebaseConfig.ts
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

//Configurações sensíveis - Credenciais do APP
const firebaseConfig = {
  apiKey: 'AIzaSyC81YNWKiJePrR12KOYk7dFGc7sZkaiJaI',
  authDomain: 'monkey.app.financeiro.open.finance.TCC',
  projectId: 'monkey-f805b',
  storageBucket: 'monkey-f805b.firebasestorage.app',
  messagingSenderId: '104043920090',
  appId: '1:104043920090:android:d6c1b60a6232d84765c3e3',
};

//Inicializa o app
const app = initializeApp(firebaseConfig);

//Exporta os serviços do Firebase
const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}) ;
const db = getFirestore(app);

export { app, auth, db };

