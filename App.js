import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import Button from './components/Button';
import Input from './components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {

  const onPress = async () => {
    const items = await AsyncStorage.getItem('entries');
    alert(items);
    // alert("Date is " + date);
    // alert("Pages Read is " + pagesread);
    // alert("Child Comment is " + childcomment);
    // alert("Teacher/Parent Comment is " + tpcomment);
  }

  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [pagesread, setPagesRead] = useState(null);
  const [childcomment, setChildComment] = useState(null);
  const [tpcomment, setTPComment] = useState(null);

  const SubmitHandler = async () => {
    const x = { id: Date.now(), title, date };
    //const update = [...xxx,x];
    await AsyncStorage.setItem('entries', JSON.stringify(x));

  }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{'\n'}{'\n'}NEW ENTRY{'\n'}</Text>
      <Text>Enter Book Title:</Text>
      <Input
        inputvalue={setTitle}
      />
      <Text>Enter Date:</Text>
      <Input
        inputvalue={setDate}
      />
      <Text>Pages Read:</Text>
      <Input
        inputvalue={setPagesRead}
      />
      <Text>Child Comment:</Text>
      {/* <TextInput
        style={styles.multi}
        onChangeText={setChildComment}
        multiline={true}
      //      placeholder="useless placeholder"
      //      keyboardType="numeric"
      /> */}
      <Input
        inputvalue={setChildComment}
        multi={true}
      />
      <Text>Teacher / Parent Comment:</Text>
      {/* <TextInput
        style={styles.multi}
        onChangeText={setTPComment}
        multiline={true}
      //      placeholder="useless placeholder"
      //      keyboardType="numeric"
      /> */}
      <Input
        inputvalue={setTPComment}
      />
      <Button
        text='Add'
        //onPress={onPress}
        onPress={SubmitHandler}
      />
      <Text>{'\n'}</Text>
      <Button
        text='Display'
        //onPress={onPress}
        onPress={onPress}
      />
            <Text>{'\n'}</Text>
      <Button
        text='Wipe'
        //onPress={onPress}
        onPress={onPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  multi: {
    height: 100,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
