import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'




const ListItem = ({ ent, onPress }) => {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 3 }}>
                <Text>
                    {ent?.title}
                </Text>
            </View>
            <View style={{ flex: 4 }}>
                <Text>
                    {ent?.date}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Pressable onPress={() => navigation.navigate('EditEntry')}>
                    <MaterialIcons name="remove-red-eye" size={25} color="black" />
                </Pressable>
            </View>
            <Pressable onPress={() => onPress={onPress}}>
                <MaterialIcons name="delete" size={25} color="black" />
            </Pressable>
        </View>
    )
}
//backgroundColor: '#FF5F7E' RED
const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    }
})

export default ListItem