import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from '../help/action';
const ItemContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {

        //Create an Entry
        case actionTypes.create:
            return [
                ...state, action.payload
            ];
        //Load existing Entries
        case actionTypes.load:
            return [
                ...action.savedEntries
            ];
        //Delete an existing entry by ID
        case actionTypes.delete:
            return state.filter(entry => entry.id !== action.DeleteID);

        //Modify an existing entry. Take the modified data and then update the object.
        case actionTypes.edit:
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

export const ItemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    const AsyncStorageKey = "ParaMahalingam";


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
        try {
            const existingEntries = await AsyncStorage.getItem(AsyncStorageKey)
            if (existingEntries != null) {
                const savedEntries = JSON.parse(existingEntries);
                dispatch({ type: actionTypes.load, savedEntries })

            }
            else {
                console.log('No Entries')
            }
        }
        catch (err) {
            console.log('Unable to load due to: ' + err)
        }
    }


    //Add an entry
    const addItem = (payload, callback) => {
        dispatch({ type: actionTypes.create, payload: payload });
        if (callback) {
            callback();
        }
    };

    //Delete an Entry
    const deleteItem = (id, callback) => {
        dispatch({ type: actionTypes.delete, DeleteID: id })
        if (callback)
            callback();
    }

    //Edit an Entry
    const editItem = (modified, callback) => {
        dispatch({ type: actionTypes.edit, payload: modified })
        if (callback)
            callback();
    };


    return (
        <ItemContext.Provider value={{
            state: state,
            create: addItem,
            remove: deleteItem,
            edit: editItem,
            load: open,
            save: save,
        }}>
            {children}
        </ItemContext.Provider>
    )
};

export default ItemContext;