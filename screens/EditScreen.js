import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, LogBox, TextInput, Button, Platform } from 'react-native';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';

//Disable the Non-serializable values were found warning. This warning occurs due the callback function.
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function EditScreen({ navigation, route }) {
  const { ent: e, editEntry } = route.params;
  const id = e.id;
  const [title, setTitle] = useState(e.title);
  const [date, setDate] = useState(new Date(e.date));
  const [pagesread, setPagesRead] = useState(e.pages);
  const [childcomment, setChildComment] = useState(e.c_comment);
  const [tpcomment, setTPComment] = useState(e.tp_comment);
  const [bookCover, setBookCover] = useState(e.cover);


  const [datePicker, setdatePicker] = useState(false);

  //Show Date picker if its not a web browser
  const showDatePicker = () => {
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
    editEntry({ id: id, title: title, date: new Date(date).toISOString(), pages: pagesread, c_comment: childcomment, tp_comment: tpcomment, cover: bookCover });
    alert('Modifed!');
    navigation.pop();
  };



  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.label}>Book Title:</Text>
        <Input inputvalue={setTitle} val={title} />
        <Text style={styles.label}>Date: {date.toLocaleDateString()}</Text>
        <View style={{ margin: 12 }}>
          {!datePicker && (<Button style={{ margin: 12 }} title="Pick Date" color="purple" onPress={showDatePicker} />)}
        </View>
        {datePicker && (<DateTimePicker value={date} display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChange} />)}
        <Text style={styles.label}>Pages Read:</Text>
        <Input inputvalue={setPagesRead} val={pagesread} />
        <Text style={styles.label}>Child Comment:</Text>
        <TextInput style={styles.multiinput} onChangeText={setChildComment} multiline value={childcomment} />
        <Text style={styles.label}>Teacher / Parent Comment:</Text>
        <TextInput style={styles.multiinput} onChangeText={setTPComment} multiline value={tpcomment} />
        <Text style={styles.label}>Book cover image link:</Text>
        <Input val={bookCover} editable={false} />

        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <CustomButton title='Get Cover' onPress={getBookCover} />
          <Text> </Text>
          <CustomButton title='Modify' onPress={onPressHandler} />
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

export default EditScreen;