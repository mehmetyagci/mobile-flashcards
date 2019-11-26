import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {whiteSmoke, purple} from '../utils/colors';

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default class AddDeck extends Component {
  state = {
    newDeck: '',
  };

  submit = () => {
    console.group ('AddDeck->submit');
    const {newDeck} = this.state;

    console.log ('newDeck:', newDeck);

    // Update Redux

    this.setState (() => ({deck: ''}));

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupend ('AddDeck->submit');
  };

  render () {
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput placeholder="Type your new deck name, and submit form" />
        <SubmitBtn onPress={this.submit} />
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
});
