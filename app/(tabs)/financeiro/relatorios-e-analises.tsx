import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function RelatoriosScreen() {
    return (
        <View>
            <LineChart
                data={{
                    labels: ["Jan", "Fev", "Mar"],
                    datasets: [{ data: [50, 100, 75] }]
                }}
                width={Dimensions.get('window').width}
                height={220}
                yAxisLabel="R$"
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
            />
        </View>
    );
}
