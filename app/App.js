import { useEffect } from 'react';
import firebaseApp from './services/firebaseConfig';

export default function App() {
    useEffect(() => {
        console.log('Firebase inicializado:', firebaseApp.name);
    }, []);

    return (
        <div>
            {/* ... seu app */}
        </div>
    );
}
