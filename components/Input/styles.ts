import { StyleSheet } from 'react-native'
import { fonts } from '../../styles/fonts'

export default StyleSheet.create({
	container: {
		marginBottom: 16
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		textAlignVertical: 'center',
		fontFamily: fonts.IBMPlexMonoRegular
	},
	multilineInput: {
		height: "100%",
		textAlignVertical: 'top',
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		fontFamily: fonts.IBMPlexMonoRegular
	}
})
