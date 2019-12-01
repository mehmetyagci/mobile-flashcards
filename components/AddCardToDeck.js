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

export default class AddCardToDeck extends Component {
  constructor (props) {
    super (props);
    console.log ('AddCardToDeck->props:', props);
    this.state = {
      question: '',
      answer: true,
    };
  }

  submit = () => {
    console.group ('AddCardToDeck->submit');
    const {question, answer} = this.state;

    console.log (`question:${question} answer:${answer}`);

    if (!question || answer === undefined) return;

    // Update Redux
    alert ('this.props.addDeckCallback  worked', text);
    this.props.addDeckCallback (text);

    this.setState ({question: '', answer: true });

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupEnd ('AddCardToDeck->submit');
  };

  onChangeText = question => this.setState ({question});

  clearAsyncstorage = () => {
    alert ('clearAsyncstorage');
    this.props.clearAsyncstorage ();
  };

  render () {
    const {question, answer} = this.state;

    return (
      <View>
        <Text style={styles.text}>Add Deck</Text>
        <TextInput
          style={styles.input}
          value={question}
          placeholder="Type your card question and check answer"
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
