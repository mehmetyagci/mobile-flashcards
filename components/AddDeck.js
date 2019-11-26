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
  constructor (props) {
    super (props);
    console.log ('AddDeck->props:', props);
    this.state = {
      newDeck: '',
    };
  }

  submit = () => {
    console.group ('AddDeck->submit');
    const {newDeck} = this.state;

    console.log ('newDeck:', newDeck);

    if (!newDeck) return;

    // Update Redux
    this.props.addDeckCallback (newDeck);

    this.setState ({newDeck: ''});

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupEnd ('AddDeck->submit');
  };

  onChangeText = text => this.setState ({newDeck: text});

  render () {
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput
          placeholder="Type your new deck name, and submit form"
          onChangeText={this.onChangeText}
        />
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
