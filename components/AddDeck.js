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
    <TouchableOpacity onPress={onPress} disabled={true}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default class AddDeck extends Component {
  constructor (props) {
    super (props);
    console.log ('AddDeck->props:', props);
    this.state = {
      text: '',
    };
  }

  submit = () => {
    console.group ('AddDeck->submit');
    const {text} = this.state;

    console.log ('newDeckTitle:', text);

    if (!text) return;

    // Update Redux
    alert ('this.props.addDeckCallback  worked', text);
    this.props.addDeckCallback (text);

    this.setState ({text: ''});

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupEnd ('AddDeck->submit');
  };

  onChangeText = text => this.setState ({text});

  clearAsyncstorage = () => {
    alert ('clearAsyncstorage');
    this.props.clearAsyncstorage ();
  };

  render () {
    const {text} = this.state;

    return (
      <View>
        <Text style={styles.text}>Add Deck</Text>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Type your new deck name, and submit form"
          onChangeText={this.onChangeText}
        />
        <SubmitBtn onPress={this.submit} />

        <TouchableOpacity
          onPress={this.clearAsyncstorage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Clear Storage</Text>
        </TouchableOpacity>

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
