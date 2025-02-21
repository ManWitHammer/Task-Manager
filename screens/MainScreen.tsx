import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import EditNote from './EditTaskScreen'
import { useStore } from '../store/store'
import globalStyles from '../styles/global'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Task {
    title: string
    date: string
    content: string
}

interface WithId {
    id: string
}

type TaskWithId = Task & WithId

const MainScreen: React.FC = () => {
    const { tasks, removeTask, selectTask, selectedTask } = useStore()

    const navigateToEditScreen = (item: TaskWithId) => {
        selectTask(item)
    }
    if (selectedTask) {
        return <EditNote/>
    } else {
        return (
            <KeyboardAvoidingView 
                style={globalStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.header}>Все записи{tasks.length == 0 && "(их нет)"}</Text>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskCard}>
                            <TouchableOpacity style={styles.taskButton} onPress={() => navigateToEditScreen(item)}>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <Text style={styles.taskDate}>{item.date}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.deleteButton}>
                                <MaterialCommunityIcons name='delete' color="white" size={20}/>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        marginVertical: 10,
    },
    taskCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
    },
    taskButton: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDate: {
        fontSize: 14,
        color: '#777',
    },
    deleteButton: {
        backgroundColor: '#007AFF',
		padding: 6,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10
    },
})

export default MainScreen
