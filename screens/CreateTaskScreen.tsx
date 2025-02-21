import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, ScrollView } from 'react-native'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import globalStyles from '../styles/global'
import Header from '../components/Header/Header'
import { useStore } from '../store/store'

const CreateTaskScreen: React.FC = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [time, setTime] = useState('')
	const { addTask, errorText } = useStore()

	useEffect(() => {
		if (errorText) {
			alert(errorText)
		}
	}, [errorText])

	const handleSave = () => {
		const res = addTask({
			id: Math.random().toString(),
			title,
			date: time,
			content,
		})
		if (res) {
			setTitle('')
			setContent('')
			setTime('')
		}
	}

    const handleDateChange = (text: string) => {
        const cleaned = text.split(".").join("")
        const truncated = cleaned.slice(0, 8)
    
        let formattedDate = ''
        truncated.split("").forEach((el, i) => {
            if (i == 2 || i == 4) {
                formattedDate += '.'
            }
            formattedDate += el
        })
        setTime(formattedDate)
    }

	return (
		<KeyboardAvoidingView 
			style={globalStyles.container} 
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} 
		>
			<ScrollView 
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<Header title="Название записи"/>
				<View style={styles.content}>
					<Input label="Заголовок" value={title} onChangeText={setTitle} />
					<Input 
						label="Время (HH:MM:ГГГГ)" 
						value={time} 
						onChangeText={handleDateChange} 
						keyboardType="numeric"
						maxLength={10} 
					/>
					<View style={{flex: 1}}>
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
		paddingBottom: 20, 
	},
	date: {
		fontSize: 14,
		color: '#666',
	},
	content: {
		flex: 1,
		paddingVertical: 10,
	}
})

export default CreateTaskScreen