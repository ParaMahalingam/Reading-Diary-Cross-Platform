import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, LogBox } from 'react-native';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

//Disable the Non-serializable values were found warning. This warning occurs due the callback function.
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function EditScreen({ navigation, route }) {
  const { ent: e, editEntry } = route.params;
  const id = e.id;
  const [title, setTitle] = useState(e.title);
  const [date, setDate] = useState(e.date);
  const [pagesread, setPagesRead] = useState(e.pages);
  const [childcomment, setChildComment] = useState(e.c_comment);
  const [tpcomment, setTPComment] = useState(e.tp_comment);
  const [bookCover, setBookCover] = useState(e.cover);

  //Get the book cover using the Google books API. Searched for the book cover based on the title.
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
    editEntry(id, title, date, pagesread, childcomment, tpcomment, bookCover);
    alert('Modifed!');
    navigation.pop();
  };


  return (
    <ScrollView>
      <Text style={styles.ttl}>{'\n'}Currently modifying entry with ID: {id}{'\n'}</Text>
      <Text>Book Title:</Text>
      <Input inputvalue={setTitle} val={title} />
      <Text>Date:</Text>
      <Input inputvalue={setDate} val={date} />
      <Text>Pages Read:</Text>
      <Input inputvalue={setPagesRead} val={pagesread} />
      <Text>Child Comment:</Text>
      <TextInput style={{ padding: 10, borderWidth: 2, margin: 12, height: 100 }} onChangeText={setChildComment} multiline value={childcomment} />
      <Text>Teacher / Parent Comment:</Text>
      <TextInput style={{ padding: 10, borderWidth: 2, margin: 12, height: 100 }} onChangeText={setTPComment} multiline value={tpcomment} />
      <Text>Book cover image link:</Text>
      <Input val={bookCover} editable={false} />
      <View style={{ alignItems: 'center' }}>
        <CustomButton title='Get Cover' onPress={getBookCover} />
        <Text> </Text>
        <CustomButton title='Modify' onPress={onPressHandler} />
      </View>
    </ScrollView>
  );

};
const styles = StyleSheet.create({
  ttl: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default EditScreen;