import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AddDecl from './components/AddDeck';


export default class App extends React.Component {
  componentDidMount () {
    console.log ('App->Before');

    console.log ('App->After');
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>MY Initial Commit</Text>
        <AddDeck />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
