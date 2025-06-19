import { useState } from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
//Importações React Native + biblioteca de gráfico
import Header from '../../../src/components/Header';
import MenuFechado from '../../../src/components/MenuFechado';
import NavigationDrawer from '../../../src/components/NavigationDrawer';
//Importação de componentes personalizados

export default function RelatoriosScreen() {
    const [drawerOpen, setDrawerOpen] = useState(false); //Estado que controla se o menu lateral está aberto

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <NavigationDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)}/>
            {/*Menu lateral de navegação*/}

            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 16 }}>
                Relatório Financeiro
            </Text>
            {/*Título da tela*/}

            <View style={{ padding: 16 }}>

                <LineChart
                    data={{
                        labels: ["Jan", "Fev", "Mar"],
                        datasets: [{ data: [50, 100, 75] }]
                    }}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    yAxisLabel="R$"
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
                    }}
                    style={{ borderRadius: 16 }}
                />
                {/*Gráfico de linha representando dados financeiros fictícios*/}

            </View>
            <Header />
            <MenuFechado />
        </SafeAreaView>
    );
}
