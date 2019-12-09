import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button, Text as NBText} from 'native-base';
import {RadioButton} from 'react-native-paper';

import {skyblue} from '../utils/colors';

export default class AddCardScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      question: '',
      checked: 'correct',
    };
  }

  onAddCard = () => {
    const {question, checked} = this.state;

    if (!question || !checked) {
      alert ('Please fill card question');
      return;
    }

    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;

    let newCard = new Object ();
    newCard.question = question;
    newCard.answer = checked === 'correct' ? true : false;

    this.props.navigation.state.params.saveCard (deckId, newCard);
    this.props.navigation.goBack ();
  };

  componentWillUnmount () {
    this.props.navigation.state.params.onGoBack ();
  }

  render () {
    const {checked} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          New Card
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Question"
            autoFocus
            clearButtonMode="always"
            autoCorrect={false}
            style={styles.inputs}
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
          <Button style={styles.button} onPress={this.onAddCard}>
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
  header: {
    color: 'skyblue',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: skyblue,
    margin: 25,
    justifyContent: 'center',
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
