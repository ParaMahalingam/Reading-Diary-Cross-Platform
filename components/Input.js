import React from 'react'
import { TextInput, StyleSheet } from 'react-native'




const Input = ({ inputvalue, multi, val, editable }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={inputvalue}
            multiline={multi ?? false}
            value={val}
            editable={editable}
        />
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        // width: 300,
        margin: 12,
        borderWidth: 2,
        padding: 10,
    }
})

export default Input