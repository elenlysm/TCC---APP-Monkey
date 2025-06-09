// app/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔒 Configurações sensíveis — substitua pelos valores reais do seu projeto Firebase
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_PROJETO.firebaseapp.com',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_PROJECT_ID.appspot.com',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firebase
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
