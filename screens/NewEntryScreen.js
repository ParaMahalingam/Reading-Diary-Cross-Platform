import React, { useContext, useState } from 'react';
import { Text, View, ScrollView, TextInput, KeyboardAvoidingView, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ItemContext from '../contexts/ItemContext';


function NewEntryScreen({ navigation, route }) {
    const { create } = useContext(ItemContext);
    //const { callback } = route.params;
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date(Date.now()));
    const [pagesread, setPagesRead] = useState('');
    const [childcomment, setChildComment] = useState('');
    const [tpcomment, setTPComment] = useState('');
    const [bookCover, setBookCover] = useState('Press the Get Cover button.');

    const [datePicker, setdatePicker] = useState(false);


    //Show Date picker if its not a web browser
    const showPicker = () => {
        if (Platform.OS == 'web') {
            alert('Date picker is not supported on browser')
        }
        else {
            setdatePicker(true);
        }
    };

    //Set date to variable
    const onChange = (event, date) => {
        if (Platform.OS === 'android') {
            setdatePicker(false);
        }

        if (date) {
            setDate(date);
        }
        else {
            console.log('Operation cancelled')
        }
    };

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
        create({ id: Date.now(), title: title, date: date.toISOString(), pages: pagesread, c_comment: childcomment, tp_comment: tpcomment, cover: bookCover }, () => navigation.pop());
    };


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.label}>Book Title:</Text>
                <Input inputvalue={setTitle} />
                <Text style={styles.label}>Date: {date.toLocaleDateString()}</Text>
                <View style={{ margin: 12 }}>
                    {!datePicker && (<Button style={{ margin: 12 }} title="Pick Date" color="purple" onPress={showPicker} />)}
                </View>
                {datePicker && (<DateTimePicker value={date} display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChange} />)}
                <Text style={styles.label}>Pages Read:</Text>
                <Input inputvalue={setPagesRead} />
                <Text style={styles.label}>Child Comment:</Text>
                <TextInput style={styles.multiinput} onChangeText={setChildComment} multiline />
                <Text style={styles.label}>Teacher / Parent Comment:</Text>
                <TextInput style={styles.multiinput} onChangeText={setTPComment} multiline />
                <Text style={styles.label}>Book cover image link:</Text>
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
    },
    label:
    {
        fontSize: 15
    },
    datePicker: {
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});
export default NewEntryScreen;