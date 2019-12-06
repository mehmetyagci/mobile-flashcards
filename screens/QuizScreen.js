import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import FlipComponent from 'react-native-flip-component';

import {getDeck} from '../utils/api';

export default class QuizScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      deck: {},
      questionIndex: undefined,
      isFlipped: false,
      correctResult: 0,
    };
  }

  componentDidMount () {
    console.log ('QuizScreen->componentDidMount');
    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;

    console.log (deckId);

    this.fetchData (deckId);
  }

  fetchData = async deckId => {
    console.log ('QuizScreen->fetchData');
    const filteredDeck = await getDeck (deckId);
    console.log ('fetcData->filteredDeck');
    console.log (filteredDeck);

    console.log ('filteredDeck.questions');
    console.log (filteredDeck.questions);
    this.setState ({deck: filteredDeck, questionIndex: 0});
    console.log ('this.state.deck.title:', this.state.deck.title);
    console.log ('this.state.questionIndex:', this.state.questionIndex);
  };

  onCorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const answer = currentQuestion.answer;
    console.log ('answer1');
    console.log (answer);

    if (answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    // alert ('Correct selected!');
  };

  onIncorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const answer = currentQuestion.answer;
    console.log ('answer2');
    console.log (answer);

    if (!answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    //alert ('Incorrect selected!');
  };

  render () {
    const {deck, questionIndex} = this.state;

    console.log ('render->deck');
    console.log (deck);

    console.log ('render->questionIndex');
    console.log (questionIndex);

    if (questionIndex === undefined) {
      return <View><Text>Loading...</Text></View>;
    }

    if (deck.questions === undefined || deck.questions.length <= 0) {
      return (
        <View>
          <Text>No question found!</Text>
        </View>
      );
    }

    const currentQuestion = deck.questions[questionIndex];
    const questionCount = deck.questions.length;

    console.log ('currentQuestion');
    console.log (currentQuestion);

    // console.log ('currentQuestion.answer');
    // console.log (currentQuestion.answer);

    console.log ('questionCount');
    console.log (questionCount);

    if (questionIndex === questionCount) {
      return (
        <View>
          <Text>Test completed! </Text>
          <Text>Correct answered count:{this.state.correctResult}</Text>
          <Text>Total count:{questionCount}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Quiz View</Text>

        <Text>{questionIndex + 1 + '/' + questionCount} </Text>
        <FlipComponent
          isFlipped={this.state.isFlipped}
          frontView={
            <View style={styles.card1}>

              <Text style={{textAlign: 'center'}}>
                {currentQuestion.question}
              </Text>
              <TouchableOpacity onPress={this.onCorrect} style={styles.button}>
                <Text>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onIncorrect}
                style={styles.button}
              >
                <Text>Incorrect</Text>
              </TouchableOpacity>
            </View>
          }
          backView={
            <View style={styles.card2}>

              <Text>{currentQuestion.answer ? 'Correct' : 'Incorrect'}</Text>

            </View>
          }
        />
        <Button
          onPress={() => {
            this.setState ({isFlipped: !this.state.isFlipped});
          }}
          title={this.state.isFlipped ? 'Question' : 'Answer'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 470,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
