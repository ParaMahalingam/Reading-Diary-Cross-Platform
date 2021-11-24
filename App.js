import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Button from './components/Button';
import Input from './components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = { primary: '#1f145c', white: '#fff' }


export default function App() {

  const [date, setDate] = useState(null)
  const [title, setTitle] = useState(null)
  const [pagesread, setPagesRead] = useState(null)
  const [childcomment, setChildComment] = useState(null)
  const [tpcomment, setTPComment] = useState(null)
  const [entries, setEntries] = useState([]);
  console.log(entries);

  const addEntry = () => {
    const ent = { id: Date.now(), title: title, date: date, pages: pagesread, c_comment: childcomment, tp_comment: tpcomment }
    setEntries([...entries, ent]);
  }

  const save = async () => {
    try {
      await AsyncStorage.setItem('entries', JSON.stringify(entries));
      console.log('hi x')
    }
    catch (err) {
      console.log('Unable to save due to: ' + err);
    }

  }
  const open = async () => {
    try {
      const existingEntries = await AsyncStorage.getItem('entries');
      if (existingEntries != null) {
        console.log('No Entries')
      }
      else {
        console.log('hi y')
        setEntries(JSON.parse(existingEntries))
      }
    }
    catch (err) {
      console.log('Unable to save due to: ' + err);
    }
  }

  //Clear the Array and the AsyncStorage so that it it doesn't load back when the app is restarted.
  clearEntries = async () => {
    setEntries([])
    AsyncStorage.clear()
  }

  useEffect(() => { open() }, [])
  useEffect(() => { save(entries) }, [entries])

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 3 }}>
          <Text>
            {todo?.title}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <Text>
            {todo?.date}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>
            {todo?.pages}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>
            {todo?.c_comment}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>
            {todo?.tp_comment}
          </Text>
        </View>
        {/* {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={[styles.actionIcon, { backgroundColor: 'green' }]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <SafeAreaView>

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
        onPress={addEntry}
      />
      {/* <Text>{'\n'}</Text>
      <Button
        text='Display'
        //onPress={onPress}
        onPress={onPress}
      /> */}
      <Text>{'\n'}</Text>
      <Button
        text='Wipe'
        //onPress={onPress}
        onPress={clearEntries}
      />
      {/* <Text>{'\n'}</Text> */}
      {/* <Button
        text='getData'
        //onPress={onPress}
        onPress={getData}
      /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={entries}
        renderItem={({ item }) => <ListItem todo={item} />}
      />


      {/* <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            placeholder="Add Todo"
            onChangeText={text => setTitle(text)}
          />
        </View>
        <TouchableOpacity onPress={addEntry}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Text style={styles.title}>{'\n'}{'\n'}NEW ENTRY{'\n'}</Text>
  //     <Text>Enter Book Title:</Text>
  //     <Input
  //       inputvalue={setTitle}
  //     />
  //     <Text>Enter Date:</Text>
  //     <Input
  //       inputvalue={setDate}
  //     />
  //     <Text>Pages Read:</Text>
  //     <Input
  //       inputvalue={setPagesRead}
  //     />
  //     <Text>Child Comment:</Text>
  //     {/* <TextInput
  //       style={styles.multi}
  //       onChangeText={setChildComment}
  //       multiline={true}
  //     //      placeholder="useless placeholder"
  //     //      keyboardType="numeric"
  //     /> */}
  //     <Input
  //       inputvalue={setChildComment}
  //       multi={true}
  //     />
  //     <Text>Teacher / Parent Comment:</Text>
  //     {/* <TextInput
  //       style={styles.multi}
  //       onChangeText={setTPComment}
  //       multiline={true}
  //     //      placeholder="useless placeholder"
  //     //      keyboardType="numeric"
  //     /> */}
  //     <Input
  //       inputvalue={setTPComment}
  //     />
  //     <Button
  //       text='Add'
  //       //onPress={onPress}
  //       onPress={addEntry}
  //     />
  //     <Text>{'\n'}</Text>
  //     <Button
  //       text='Display'
  //       //onPress={onPress}
  //       onPress={onPress}
  //     />
  //     <Text>{'\n'}</Text>
  //     <Button
  //       text='Wipe'
  //       //onPress={onPress}
  //       onPress={clearAsyncStorage}
  //     />
  //     <Text>{'\n'}</Text>
  //     {/* <Button
  //       text='getData'
  //       //onPress={onPress}
  //       onPress={getData}
  //     /> */}

  //     {/* <View>
  //       {storedentries.map((item) => (
  //         <Text>{item.id}</Text>
  //       ))}
  //     </View> */}

  //     <FlatList
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
  //       data={entries}
  //       renderItem={({ item }) => <ListItem todo={item} />}
  //     />


  //   </SafeAreaView>
  // );
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


  /////////////
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
