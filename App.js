import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from './screens/IndexScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import EditScreen from './screens/EditScreen';
import ViewScreen from './screens/ViewScreen';
import { ItemProvider } from './contexts/ItemContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ItemProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen
            name='Index'
            component={IndexScreen}
            options={{ title: "Diary Entries" }}
          />
          <Stack.Screen
            name='NewEntry'
            component={NewEntryScreen}
            options={{ title: "New Entry" }}
          />
          <Stack.Screen
            name='ViewEntry'
            component={ViewScreen}
            options={{ title: "View Entry" }}
          />
          <Stack.Screen
            name='EditEntry'
            component={EditScreen}
            options={{ title: "Edit Entry" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};