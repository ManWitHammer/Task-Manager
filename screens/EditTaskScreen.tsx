import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import Button from '../components/Button/Button'
import { useStore } from '../store/store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Input from '../components/Input/Input'
import Header from '../components/Header/Header'
import globalStyles from '../styles/global'

export default function EditNote() {
    const { selectedTask, updateTask, selectTask, errorText } = useStore()
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
          const res = updateTask(selectedTask.id, { title, date, content })
          if (res) selectTask(null)
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
          <View style={styles.upCase}>
            <TouchableOpacity onPress={() => selectTask(null)}>
              <MaterialCommunityIcons name='arrow-left' size={30} color="#007AFF" />
            </TouchableOpacity>
            <Header title="Редактирование" />
          </View>
          <View style={styles.content}>
            <Input label="Заголовок" value={title} onChangeText={setTitle} />
            <Input 
              label="Дата" 
              value={date} 
              onChangeText={handleDateChange} 
              keyboardType="numeric"
              maxLength={10} 
            />
            <View style={{flex: 1}}>
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
    upCase: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#eee',
    }
})