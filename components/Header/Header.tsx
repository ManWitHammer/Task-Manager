// src/components/Button/index.tsx
import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

interface HeaderProps {
    title: string
}

const Button: React.FC<HeaderProps> = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
    </View>
)

export default Button
