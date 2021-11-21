import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


const width = Dimensions.get('window').width


const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttoncontainer}>
        <Text style={styles.buttontext}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}
//backgroundColor: '#FF5F7E' RED
const styles = StyleSheet.create({
  buttoncontainer: {
    backgroundColor: '#34BE82',
    paddingVertical: 8,
    width: width / 1.5,
    borderRadius: 5
  },

  buttontext: {
    color: '#222831',
    fontSize: 20,
    textAlign: 'center',
  }
})

export default Button