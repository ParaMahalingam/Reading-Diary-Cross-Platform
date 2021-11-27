import React from 'react'
import { TextInput, StyleSheet } from 'react-native'




const Input = ({ inputvalue, label, multi }) => {
    return (   
        <TextInput
            style={styles.input}
            onChangeText={inputvalue}
            multiline={multi ?? false}
        //      placeholder="useless placeholder"
        //      keyboardType="numeric"
        />
    )
}
//backgroundColor: '#FF5F7E' RED
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