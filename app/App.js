import { useEffect } from 'react';
import firebaseApp from './services/firebaseConfig';
import Navigation from './navigation';


export default function App() {
    return <Navigation />;
    useEffect(() => {
        console.log('Firebase inicializado:', firebaseApp.name);
    }, []);

    return (
        <div>
            {/* ... seu app */}
        </div>
    );
}
