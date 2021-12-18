import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (state, action) => {
    switch (action.type) {

        //Create an Entry
        case 'Create':
            return [
                ...state, action.payload
            ];

        //Load existing Entries
        case 'Load':
            return [
                ...action.savedEntries
            ];
        //Delete an existing entry by ID
        case 'Delete':
            return state.filter(entry => entry.id !== action.DeleteID);

        //Modify an existing entry. Take the modified data and then update the object.
        case 'Update':
            return state.map((entry) => {
                if (entry.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return entry;
                }
            });

        default:
            return state;
    }
};


function IndexScreen({ navigation }) {

    const [state, dispatch] = useReducer(reducer, []);
    const AsyncStorageKey = "ParaMahalingam";


    //Modify an existing entry. Take the modified data and then update the object.
    const editEntry = (modified) => {
        dispatch({ type: 'Update', payload: modified })
    };


    //Save the entries to Async storage, so that the entries can be retried when the app is re-opened.
    const save = async () => {
        try {
            await AsyncStorage.setItem(AsyncStorageKey, JSON.stringify(state))
        }
        catch (err) {
            console.log('Unable to save due to: ' + err)
        }

    };

    //Load existing entries from Async storage and then add them to the array.
    const open = async () => {
        //AsyncStorage.clear()
        try {
            const existingEntries = await AsyncStorage.getItem(AsyncStorageKey)
            if (existingEntries != null) {
                const savedEntries = JSON.parse(existingEntries);
                dispatch({ type: 'Load', savedEntries })

            }
            else {
                console.log('No Entries')
            }
        }
        catch (err) {
            console.log('Unable to load due to: ' + err)
        }
    }



    useEffect(() => { open() }, []);
    useEffect(() => { save() }, [state]);
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="+ New"
                    onPress={() => {
                        // navigation.navigate('NewEntry', { callback: addEntry });
                        navigation.navigate('NewEntry',
                            {
                                callback: (payload) => {
                                    dispatch({ type: 'Create', payload: payload });
                                }
                            });

                    }}
                />
            )
        })
    }, [state]);


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
                        {new Date(ent.date).toLocaleDateString()}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate('ViewEntry', ent)}>
                        <MaterialIcons name="remove-red-eye" size={25} color="green" />
                    </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate('EditEntry', { ent, editEntry })}>
                        <MaterialIcons name="edit" size={25} color="black" />
                    </Pressable>
                </View>
                <Pressable onPress={() => dispatch({ type: 'Delete', DeleteID: ent.id })}>
                    <MaterialIcons name="delete" size={25} color="red" />
                </Pressable>
            </View>
        );
    };

    return (
        <View>
            <FlatList nestedScrollEnabled
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={state}
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
    }
});

export default IndexScreen;