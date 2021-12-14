import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, LogBox } from 'react-native';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

//Disable the Non-serializable values were found warning. This warning occurs due the callback function.
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);



function NewEntryScreen({ navigation, route }) {
    const { callback } = route.params;
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [pagesread, setPagesRead] = useState(null);
    const [childcomment, setChildComment] = useState(null);
    const [tpcomment, setTPComment] = useState(null);
    const [bookCover, setBookCover] = useState('Press the Get Cover button.');


    async function getBookCover() {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                setBookCover(response.items[0].volumeInfo.imageLinks.thumbnail);
                alert('Book cover retrieved!')
            })
            .catch(err => alert('Enter a valid title for cover!'));
    }

    const onPressHandler = () => {
        callback(title, date, pagesread, childcomment, tpcomment, bookCover);
        navigation.pop();
    };


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
            <Text>Book cover image link:</Text>
            <Input val={bookCover} editable={false} />
            <View style={{ alignItems: 'center' }}>
                <CustomButton title='Get Cover' onPress={getBookCover} />
                <Text></Text>
                <CustomButton title='Add' onPress={onPressHandler} />
            </View>
        </ScrollView>
    );

};

export default NewEntryScreen;