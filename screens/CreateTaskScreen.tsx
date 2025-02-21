import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, ScrollView } from 'react-native'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import globalStyles from '../styles/global'
import { useStore } from '../store/store'

const CreateTaskScreen: React.FC = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [time, setTime] = useState('')
	const { addTask, selectTask } = useStore()

	const handleSave = () => {
		addTask({
			id: Math.random().toString(),
			title,
			date: time,
			content,
		})
		setTitle('')
		setContent('')
		setTime('')
	}

	const formatDate = (input: string) => {
        const cleaned = input.split(".").join("")
        const truncated = cleaned.slice(0, 8)

        let formattedDate = ''
        for (let i = 0; i < truncated.length; i++) {
            if (i === 2 || i === 4) {
                formattedDate += '.'
            }
            formattedDate += truncated[i]
        }

        return formattedDate
    }

    const handleDateChange = (text: string) => {
        const formattedDate = formatDate(text)
        setTime(formattedDate)
    }

	return (
		<KeyboardAvoidingView 
			style={globalStyles.container} 
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Смещение для iOS
		>
			<ScrollView 
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.header}>
					<Text style={styles.title}>Название записи</Text>
				</View>
				<View style={styles.content}>
					<Input label="Заголовок" value={title} onChangeText={setTitle} />
					<Input 
						label="Время (HH:MM:ГГГГ)" 
						value={time} 
						onChangeText={handleDateChange} 
						keyboardType="numeric"
						maxLength={10} // Максимальная длина с учетом двоеточия
					/>
					<View style={styles.textArea}>
						<Input label="Текст записи" value={content} onChangeText={setContent} multiline />
					</View>
				</View>
				<Button title="Сохранить" onPress={handleSave} />
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 20, // Добавляет место для прокрутки
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#007AFF',
	},
	date: {
		fontSize: 14,
		color: '#666',
	},
	content: {
		flex: 1,
		paddingVertical: 10,
	},
	textArea: {
		flex: 1
	},
})

export default CreateTaskScreen