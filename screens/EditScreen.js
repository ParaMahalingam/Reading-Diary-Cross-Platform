import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function EditScreen({ route, navigation }) {
    /* 2. Get the param */
    // const { itemId } = route.params;
    // const { otherParam } = route.params;


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HELLLLLLLLLO, TESTING</Text>
      </View>
    );
  }
export default EditScreen;