import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreateTaskScreen from '../screens/CreateTaskScreen'
import Page1Screen from '../screens/StatisticScreen'
import MainScreen from '../screens/MainScreen'
import { BottomTabParamList } from '../types'
import { useStore } from '../store/store'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabNavigator = () => {
	const { tasks } = useStore()
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#007AFF',
				tabBarInactiveTintColor: '#8E8E93',
				tabBarStyle: {
					paddingVertical: 8,
					height: 60
				}
			}}
		>
			<Tab.Screen
				name='MainTab'
				component={CreateTaskScreen}
				options={{
					title: 'Создать',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='create' size={size} color={color} />
					),
					headerShown: false
				}}
			/>
			<Tab.Screen
				name='LoginTab'
				component={MainScreen}
				options={{
					title: 'Все записи',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='folder-open' size={size} color={color} />
					),
					headerShown: false
				}}
			/>
			{tasks.length > 0 && (
				<Tab.Screen
					name='Page2Tab'
					component={Page1Screen}
					options={{
						title: 'Статистика',
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='stats-chart' size={size} color={color} />
						)
					}}
				/>
			)}
		</Tab.Navigator>
	)
}

export default BottomTabNavigator
