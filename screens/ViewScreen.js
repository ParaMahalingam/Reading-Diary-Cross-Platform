import * as React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';

function ViewScreen({ route, navigation }) {

  const id = route.params.id;
  const title = route.params.title;
  const date = route.params.date;
  const pages = route.params.pages;
  const c_comment = route.params.c_comment;
  const tp_comment = route.params.tp_comment;
  const cover = route.params.cover;

  return (
    <ScrollView style={styles.entry}>
      <Text style={styles.entrytitle}>
        {title}
      </Text>
      <Text style={{ fontSize: 25 }}>
        Date:{'\n'}{'\n'}{new Date(date).toLocaleDateString()}{'\n'}{'\n'}Pages read:{'\n'}{'\n'}{pages}{'\n'}{'\n'}Child comment:{'\n'}{'\n'}{c_comment}{'\n'}{'\n'}Teacher / Parent comment:{'\n'}{'\n'}{tp_comment}{'\n'}{'\n'}Book cover:{'\n'}
      </Text>
      <Image
        style={{ width: 200, height: 300 }}
        source={{ uri: cover }}
      />
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