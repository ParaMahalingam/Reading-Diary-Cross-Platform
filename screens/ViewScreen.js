import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ViewScreen({ route, navigation }) {
  const { id, title, date, pages, c_comment, tp_comment } = route.params


  return (
    <ScrollView style={styles.entry}>
      <Text style={styles.entrytitle}>
        {title}
      </Text>
      <Text style={{ fontSize: 25 }}>
        ID:{'\n'}{'\n'}{id}{'\n'}{'\n'}Date:{'\n'}{'\n'}{date}{'\n'}{'\n'}Pages read:{'\n'}{'\n'}{pages}{'\n'}{'\n'}Child comment:{'\n'}{'\n'}{c_comment}{'\n'}{'\n'}Teacher / Parent comment:{'\n'}{'\n'}{tp_comment}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  entrytitle: {
    marginBottom: 21,
    textAlign: 'center',
    fontSize: 30,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  entry: {
    padding: 20,
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
});

export default ViewScreen;