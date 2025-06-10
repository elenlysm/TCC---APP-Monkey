import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function RelatoriosScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Título do relatório */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 16 }}>
                Relatório Financeiro
            </Text>
            <View style={{ padding: 16 }}>
                {/* Gráfico de linha com dados estáticos (pode ser dinâmico futuramente) */}
                <LineChart
                    data={{
                        labels: ["Jan", "Fev", "Mar"],
                        datasets: [{ data: [50, 100, 75] }]
                    }}
                    width={Dimensions.get('window').width - 32} // largura responsiva com padding
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
            </View>
        </SafeAreaView>
    );
}
