import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';



function IndexScreen({ navigation }) {

    const [entries, setEntries] = useState([]);

    //Add a newly created entry to the array.
    const addEntry = (title, date, pagesread, childcomment, tpcomment, bookcover) => {
        const ent = { id: Date.now(), title: title, date: date, pages: pagesread, c_comment: childcomment, tp_comment: tpcomment, cover: bookcover }
        setEntries([...entries, ent]);
    }

    //Modify an existing entry. Take the modified data and then update the object.
    const editEntry = (id, title, date, pagesread, childcomment, tpcomment, bookcover) => {

        const data = [...entries];
        const index = data.findIndex(entry => entry.id === id);
        
        entries[index].title = title;
        entries[index].date = date;
        entries[index].pages = pagesread;
        entries[index].c_comment = childcomment;
        entries[index].tp_comment = tpcomment;
        entries[index].cover = bookcover;
        setEntries(data);
    }

    //Delete an existing entry by ID
    const removeEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id))
    }

    //Save the entries to Async storage, so that the entries can be retried when the app is re-opened.
    const save = async () => {
        try {
            await AsyncStorage.setItem('entries', JSON.stringify(entries))
        }
        catch (err) {
            console.log('Unable to save due to: ' + err)
        }

    }

    //Load existing entries from Async storage and then add them to the array.
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
            console.log('Unable to load due to: ' + err)
        }
    }

    useEffect(() => { open() }, [])
    useEffect(() => { save(entries) }, [entries])


    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="Add"
                    onPress={() => {
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
                    <Text numberOfLines={1}>
                        {ent.title}
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text>
                        {ent.date}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate('ViewEntry', { id: ent.id, title: ent.title, date: ent.date, pages: ent.pages, c_comment: ent.c_comment, tp_comment: ent.tp_comment,cover: ent.cover })}>
                        <MaterialIcons name="remove-red-eye" size={25} color="green" />
                    </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate('EditEntry', { ent, editEntry })}>
                        <MaterialIcons name="edit" size={25} color="black" />
                    </Pressable>
                </View>
                <Pressable onPress={() => removeEntry(ent.id)}>
                    <MaterialIcons name="delete" size={25} color="red" />
                </Pressable>
            </View>
        );
    };

    return (
        <View>
            <FlatList nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={entries}
                renderItem={({ item }) => <ListItem ent={item} />}
            />
        </View>


    );
};

const styles = StyleSheet.create({
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