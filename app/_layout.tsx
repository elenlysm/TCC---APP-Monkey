import { View, StyleSheet } from "react-native";
import { useState } from 'react';
import NavigationDrawer from "./components/NavigationDrawer";
import Home from "./screens/home";
import Transacoes from "./screens/transacoes";
import OrcamentosEMetas from "./screens/orcamentos-e-metas";

export default function Layout() {
    const [activeScreen, setActiveScreen] = useState('Dashboard');

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Dashboard':
                return <Home />;
            case 'Transactions':
                return <Transacoes />;
            case 'Budget':
                return <OrcamentosEMetas />;
            default:
                return <Home />;
        }
    };

    const handleLogout = () => {
        console.log('Logout...');
    };

    return (
        <View style={styles.container}>
            <NavigationDrawer
                activeItem={activeScreen}
                onNavigate={setActiveScreen}
                onLogout={handleLogout}
            />
            <View style={styles.content}>
                {renderScreen()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flex: 1 },
    content: { flex: 1, backgroundColor: '#fff' },
});
