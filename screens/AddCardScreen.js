import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button, Text as NBText} from 'native-base';
import {RadioButton} from 'react-native-paper';

import {whiteSmoke, purple, skyblue} from '../utils/colors';

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default class AddCardScreen extends Component {
  constructor (props) {
    super (props);
    //console.log ('AddCardToDeck->props:', props);
    this.state = {
      question: '',
      checked: 'correct',
    };
  }

  onAddCard = () => {
    //alert ('AddCardScreen->onAddCard');

    const {question, checked} = this.state;

    if (!question || !checked) {
      alert ('Please fill card question');
      return;
    }

    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;
    console.log ('deckId:', deckId);

    console.log ('AddCardScreen->onAddCard->question:', question);
    console.log ('AddCardScreen->onAddCard->checked:', checked);

    let newCard = new Object ();
    newCard.question = question;
    newCard.answer = checked === 'correct' ? true : false;

    this.props.navigation.state.params.saveCard (deckId, newCard);
    // this.props.navigation.state.params.onGoBack ();
    this.props.navigation.goBack ();
  };

  submit = () => {
    console.group ('AddCardToDeck->submit');
    const {question, checked} = this.state;

    //console.log (`question:${question} checked:${checked}`);

    if (!question || !checked) return;

    // Update Redux
    // alert ('this.props.addCardToDeckCallback  worked', question, checked);

    let card = {question, checked};

    let newCard = new Object ();
    newCard.question = question;
    newCard.answer = true;

    this.props.addCardToDeckCallback ('SQL', newCard);

    this.setState ({question: '', checked: 'correct'});

    // Navigate to Home

    // Save to 'DB'

    // Clean local notification
    console.groupEnd ('AddCardToDeck->submit');
  };

  componentWillUnmount () {
    this.props.navigation.state.params.onGoBack ();
  }
  render () {
    const {question, checked} = this.state;

    // console.log ('checked');
    // console.log (checked);

    return (
      <View style={styles.container}>
        <Text style={{color: 'skyblue', fontSize: 20, fontWeight: 'bold'}}>
          New Card
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
        <View style={{marginTop: 20}}>
          <Button
            style={{
              backgroundColor: skyblue,
              margin: 25,
              justifyContent: 'center',
            }}
            onPress={this.onAddCard}
          >
            <NBText style={{fontWeight: 'bold'}}>Add Card</NBText>
          </Button>
        </View>
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
