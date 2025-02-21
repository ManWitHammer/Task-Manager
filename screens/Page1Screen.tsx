import React from 'react'
import { Text, ScrollView, Dimensions } from 'react-native'
import { BarChart, LineChart  } from 'react-native-chart-kit'
import { useStore } from '../store/store'

const screenWidth = Dimensions.get('window').width

const StatisticsScreen: React.FC = () => {
    const { tasks } = useStore()
    const countTasksByDate = () => {
        const dateCounts: Record<string, number> = {}

        tasks.forEach((task) => {
            const date = task.date
            if (dateCounts[date]) {
                dateCounts[date]++
            } else {
                dateCounts[date] = 1
            }
        })

        return dateCounts
    }

    const dateCounts = countTasksByDate()
    const chart1Data = {
        labels: Object.keys(dateCounts), 
        datasets: [
            {
                data: Object.values(dateCounts), 
            },
        ],
    }

	const chart2Data = {
		labels: tasks.map((_, index) => `№${index + 1}`), 
		datasets: [
			{
				data: tasks.map((task) => task.content.length), 
			},
		],
	}

    return (
        <ScrollView>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
                Количество записей по датам
            </Text>
            <BarChart
				data={chart1Data}
				width={screenWidth - 40} 
				height={220}
				yAxisSuffix="" 
				yAxisLabel=''
				chartConfig={{
					backgroundGradientFrom: '#ffffff',
					backgroundGradientTo: '#ffffff',
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
					labelColor: () => '#333',
					style: { borderRadius: 10 },
					barPercentage: 0.5,
				}}
				style={{
					marginVertical: 8,
					borderRadius: 10,
				}}
				fromZero
			/>
			<Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
				Количество символов в записях
            </Text>
			<LineChart
				data={chart2Data}
				width={screenWidth - 40}
				height={220}
				chartConfig={{
					backgroundGradientFrom: '#ffffff',
					backgroundGradientTo: '#ffffff',
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
					labelColor: () => '#333',
				}}
				bezier
				style={{ borderRadius: 10 }}
			/>
        </ScrollView>
    )
}

export default StatisticsScreen