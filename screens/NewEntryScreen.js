import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const COLORS = { primary: '#1f145c', white: '#fff' }

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
    // const addEntry = () => {
    //     const ent = { id: Date.now(), title: title, date: date, pages: pagesread, c_comment: childcomment, tp_comment: tpcomment }
    //     setEntries([...entries, ent]);
    // }

    // clearEntries = async () => {
    //     setEntries([])
    //     AsyncStorage.clear()
    // }

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


            {/* <Text>{'\n'}</Text>
      <Button
        text='Display'
        //onPress={onPress}
        onPress={onPress}
      /> */}



            {/* <Text>{'\n'}</Text>
            <Button
                text='Wipe'
                //onPress={onPress}
                onPress={clearEntries}
            /> */}



            {/* <Text>{'\n'}</Text> */}
            {/* <Button
        text='getData'
        //onPress={onPress}
        onPress={getData}
      /> */}
            {/* <FlatList nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={entries}
                renderItem={({ item }) => <ListItem todo={item} />}
            /> */}



        </ScrollView>
    );

};
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
    // footer: {
    //     position: 'absolute',
    //     bottom: 0,
    //     width: '100%',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    //     backgroundColor: COLORS.white,
    // },
    // inputContainer: {
    //     height: 50,
    //     paddingHorizontal: 20,
    //     elevation: 40,
    //     backgroundColor: COLORS.white,
    //     flex: 1,
    //     marginVertical: 20,
    //     marginRight: 20,
    //     borderRadius: 30,
    // },
    // iconContainer: {
    //     height: 50,
    //     width: 50,
    //     backgroundColor: COLORS.primary,
    //     elevation: 40,
    //     borderRadius: 25,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    listItem: {
        padding: 20,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
    // actionIcon: {
    //     height: 25,
    //     width: 25,
    //     backgroundColor: COLORS.white,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'red',
    //     marginLeft: 5,
    //     borderRadius: 3,
    // },
    // header: {
    //     padding: 20,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    // },
});

export default NewEntryScreen;