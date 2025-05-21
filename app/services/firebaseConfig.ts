// app/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = Constants.expoConfig?.extra || {};

// Verifica se todas as variáveis estão presentes
if (
  !FIREBASE_API_KEY ||
  !FIREBASE_AUTH_DOMAIN ||
  !FIREBASE_PROJECT_ID ||
  !FIREBASE_STORAGE_BUCKET ||
  !FIREBASE_MESSAGING_SENDER_ID ||
  !FIREBASE_APP_ID
) {
  throw new Error('Variáveis de ambiente do Firebase não foram carregadas corretamente.');
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
