import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from './screens/IndexScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import EditScreen from './screens/EditScreen';
import ViewScreen from './screens/ViewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
