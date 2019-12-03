import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {whiteSmoke, purple} from '../utils/colors';

export default class AddDeckScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Add Deck Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: whiteSmoke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  submitBtnText: {
    color: purple,
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    fontSize: 44,
    padding: 13,
    backgroundColor: purple,
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: purple,
    margin: 10,
    fontSize: 45,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FF851B',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});
