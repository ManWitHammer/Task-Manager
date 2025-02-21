import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import Button from '../components/Button/Button'
import { useStore } from '../store/store'
import Input from '../components/Input/Input'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

export default function EditNote() {
    const navigation = useNavigation()
    const { selectedTask, updateTask, selectTask } = useStore()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title)
            setDate(selectedTask.date)
            setContent(selectedTask.content)
        }
    }, [selectedTask])

    const handleSave = () => {
        if (selectedTask) {
            updateTask(selectedTask.id, { title, date, content })
            selectTask(null)
        }
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
        setDate(formattedDate)
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
          <Text style={styles.header}>Редактирование</Text>
          <View style={styles.content}>
            <Input label="Заголовок" value={title} onChangeText={setTitle} />
            <Input 
              label="Дата" 
              value={date} 
              onChangeText={handleDateChange} 
              keyboardType="numeric"
              maxLength={10} 
            />
            <View style={styles.textArea}>
              <Input label="Текст записи" value={content} onChangeText={setContent} multiline />
            </View>
            <Button title="Сохранить" onPress={handleSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, 
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#007AFF"
    },
    fullContent: {
        padding: 10,
        fontSize: 16,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginTop: 10,
    },
    content: {
      flex: 1,
      paddingVertical: 10,
    },
    textArea: {
      flex: 1
    },
})