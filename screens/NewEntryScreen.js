import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';

import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

function NewEntryScreen({ navigation, route }) {
    const { callback } = route.params;
    const [title, setTitle] = useState(null)
    const [date, setDate] = useState(null)
    const [pagesread, setPagesRead] = useState(null)
    const [childcomment, setChildComment] = useState(null)
    const [tpcomment, setTPComment] = useState(null)

    const onPressHandler = () => {
        callback(title, date, pagesread, childcomment, tpcomment)
        navigation.pop()
    }


    return (
        <ScrollView>
            <Text>Enter Book Title:</Text>
            <Input inputvalue={setTitle} />
            <Text>Enter Date:</Text>
            <Input inputvalue={setDate} />
            <Text>Pages Read:</Text>
            <Input inputvalue={setPagesRead} />
            <Text>Child Comment:</Text>
            <TextInput style={{ padding: 10, borderWidth: 2, margin: 12, height: 100 }} onChangeText={setChildComment} multiline />
            <Text>Teacher / Parent Comment:</Text>
            <TextInput style={{ padding: 10, borderWidth: 2, margin: 12, height: 100 }} onChangeText={setTPComment} multiline />
            <View style={{ alignItems: 'center' }}>
                <CustomButton title='Add' onPress={onPressHandler} />
            </View>
        </ScrollView>
    );

};
const styles = StyleSheet.create({

});

export default NewEntryScreen;