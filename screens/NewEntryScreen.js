import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, LogBox, KeyboardAvoidingView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
//Disable the Non-serializable values were found warning. This warning occurs due to the callback function.
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);



function NewEntryScreen({ navigation, route }) {
    const { callback } = route.params;
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [pagesread, setPagesRead] = useState('');
    const [childcomment, setChildComment] = useState('');
    const [tpcomment, setTPComment] = useState('');
    const [bookCover, setBookCover] = useState('Press the Get Cover button.');

    // const [date123, setDate123] = useState(new Date());

    //Get the book cover using the Google books API. Search for the book cover based on the title.
    async function getBookCover() {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
            .then(response => response.json())
            .then(response => {
                setBookCover(response.items[0].volumeInfo.imageLinks.thumbnail);
                alert('Book cover retrieved!')
            })
            .catch(err => alert('Enter a valid title for cover!'));
    };

    const onPressHandler = () => {
        callback(title, date.toISOString(), pagesread, childcomment, tpcomment, bookCover);
        navigation.pop();
    };

    const onChange = (event, date) => {
        setDate(date);
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding'>
                <Text>Enter Book Title:</Text>
                <Input inputvalue={setTitle} />
                <Text>Enter Date:</Text>
                {/* <Input inputvalue={setDate} /> */}
                <DateTimePicker value={date} display="spinner" onChange={onChange} />
                <Text>Pages Read:</Text>
                <Input inputvalue={setPagesRead} />
                <Text>Child Comment:</Text>
                <TextInput style={styles.multiinput} onChangeText={setChildComment} multiline />
                <Text>Teacher / Parent Comment:</Text>
                <TextInput style={styles.multiinput} onChangeText={setTPComment} multiline />
                <Text>Book cover image link:</Text>
                <Input val={bookCover} editable={false} />

                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <CustomButton title='Get Cover' onPress={getBookCover} />
                    <Text> </Text>
                    <CustomButton title='Add' onPress={onPressHandler} />
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    multiinput:
    {
        padding: 10,
        borderWidth: 2,
        margin: 12,
        height: 100
    }
});
export default NewEntryScreen;