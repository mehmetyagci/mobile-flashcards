import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

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
    //console.log ('AddCardToDeck->props:', props);
    this.state = {
      question: '',
      checked: 'correct',
    };
  }

  submit = () => {
    console.group ('AddCardToDeck->submit');
    const {question, checked} = this.state;

    //console.log (`question:${question} checked:${checked}`);

    if (!question || !checked) return;

    // Update Redux
    // alert ('this.props.addCardToDeckCallback  worked', question, checked);

    let card = { question, checked};

    let newCard = new Object();
    newCard.question = question;
    newCard.answer = true;

    this.props.addCardToDeckCallback("SQL", newCard);

    this.setState ({question: '', checked: 'correct'});

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupEnd ('AddCardToDeck->submit');
  };

  render () {
    const {question, checked} = this.state;

    // console.log ('checked');
    // console.log (checked);

    return (
      <View style={styles.container}>
        <Text style={{color: 'skyblue', fontSize: 20, fontWeight: 'bold'}}>
          New Question
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Question"
            underlineColorAndroid="transparent"
            onChangeText={question => this.setState ({question})}
          />
        </View>

        <View style={styles.inputContainer}>
          <RadioButton
            value="correct"
            status={checked === 'correct' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState ({checked: 'correct'});
            }}
          /><Text>Correct</Text>
          <RadioButton
            value="incorrect"
            status={checked === 'incorrect' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState ({checked: 'incorrect'});
            }}
          /><Text>Incorrect</Text>
        </View>
        <Button title="Submit" color="skyblue" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginLeft: 25,
    padding: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
  },
});
