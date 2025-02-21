export interface InputProps {
	label: string
	value: string
	onChangeText: (text: string) => void
	secureTextEntry?: boolean
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
	keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-add'
	multiline?: boolean
	maxLength?: number
}

export type RootStackParamList = {
	LoginTab: undefined
	Page1Tab: undefined
	Page2Tab: undefined
	MainTab: undefined
}

export type BottomTabParamList = {
	LoginTab: undefined
	Page1Tab: undefined
	Page2Tab: undefined
	MainTab: undefined
}
