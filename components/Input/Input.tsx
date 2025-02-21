import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { InputProps } from '../../types'
import styles from './styles'
function Input({
	label,
	value,
	onChangeText,
	secureTextEntry,
	autoCapitalize = 'none',
	keyboardType = 'default',
	multiline = false,
	maxLength
}: InputProps) {
	return (
		<View style={styles.container}>
			<TextInput
				style={multiline ? styles.multilineInput : styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder={label}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				keyboardType={
					keyboardType as 'default' | 'email-address' | 'numeric' | 'phone-pad'
				}
				multiline={multiline} // Теперь свойство применяется
				textAlignVertical={multiline ? 'top' : 'center'} // Делаем текст начальным сверху
				maxLength={maxLength}
			/>
		</View>
	)
}

export default Input
