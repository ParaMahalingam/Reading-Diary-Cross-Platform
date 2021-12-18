import React, { useContext, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import ItemContext from '../contexts/ItemContext';


function IndexScreen({ navigation }) {
    const { state, remove, load, save } = useContext(ItemContext);

    useEffect(() => { load() }, []);
    useEffect(() => { save() }, [state]);
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="+ New"
                    onPress={() => {
                        navigation.navigate('NewEntry');
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
                    <Pressable onPress={() => navigation.navigate('EditEntry', { ent })}>
                        <MaterialIcons name="edit" size={25} color="black" />
                    </Pressable>
                </View>
                <Pressable onPress={() => {
                    remove(ent.id)
                }}>
                    <MaterialIcons name="delete" size={25} color="red" />
                </Pressable>
            </View>
        );
    };


    //Conditional based rendering, if there are no entries, it will display a No entries message. Otherwise, it will display the entries stored in state.
    if (state.length == 0) {
        return (
            <View style={styles.noent}>
                <Text style={styles.txtstyle}>No Entries, Why not create one? 🤠</Text>
            </View>
        )
    }
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
    },
    txtstyle: {
        fontSize: 20,
        textAlign: 'center',
    },
    noent: {
        justifyContent: 'center',
        flex: 1,
    }
});

export default IndexScreen;