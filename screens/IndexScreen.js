import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';



function IndexScreen({ navigation, route }) {
    const [entries, setEntries] = useState([]);

    const addEntry = (title, date, pagesread, childcomment, tpcomment) => {
        const ent = { id: Date.now(), title: title, date: date, pages: pagesread, c_comment: childcomment, tp_comment: tpcomment }
        setEntries([...entries, ent]);
    }

    const removeEntry = (id) => {
        setEntries(entries.filter(entry => entry.title !== id))
    }
    const save = async () => {
        try {
            await AsyncStorage.setItem('entries', JSON.stringify(entries))
        }
        catch (err) {
            console.log('Unable to save due to: ' + err)
        }

    }
    const open = async () => {
        try {
            const existingEntries = await AsyncStorage.getItem('entries')
            if (existingEntries != null) {
                setEntries(JSON.parse(existingEntries))
            }
            else {
                console.log('No Entries')
            }
        }
        catch (err) {
            console.log('Unable to save due to: ' + err)
        }
    }

    useEffect(() => { open() }, [])
    useEffect(() => { save(entries) }, [entries])

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                // <Pressable onPress={() => navigation.navigate('NewEntry', { callback: addEntry })}>
                //     <MaterialIcons name="add" size={25} color="black" />
                // </Pressable>
                <Button
                    title="Add"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('NewEntry', { callback: addEntry });
                    }}
                />
            )
        })
    }, [entries])


    const ListItem = ({ ent }) => {
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
                <Pressable onPress={() => removeEntry(ent?.title)}>
                    <MaterialIcons name="delete" size={25} color="black" />
                </Pressable>
                {/* <View style={{ flex: 3 }}>
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
                </View> */}
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
        <View>
            {/* 
            <FlatList
                data={entries}
                keyExtractor={(e) => e.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.title}</Text>
                        </View>

                    )
                }}
            /> */}

            <FlatList nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={entries}
                renderItem={({ item }) => <ListItem ent={item} />}
            />



            {/* <Button
                title="Go to New Entry"
                onPress={() => navigation.navigate('NewEntry')}
            />
            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            /> */}
        </View>


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

    listItem: {
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
});

export default IndexScreen;