import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import FlipComponent from 'react-native-flip-component';
import {AppLoading} from 'expo';

import {
  Container,
  Content,
  Card,
  CardItem,
  Button as NBButton,
  Text as NBText,
  Body,
  View as NBView,
} from 'native-base';

import {getDeck} from '../utils/api';
import {skyblue, gray} from '../utils/colors';

import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

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
    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;

    this.fetchData (deckId);
  }

  fetchData = async deckId => {
    const filteredDeck = await getDeck (deckId);

    this.setState ({deck: filteredDeck, questionIndex: 0});
  };

  onCorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const questionCount = deck.questions.length;
    const answer = currentQuestion.answer;

    if (answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    const currentQuestionIndex = this.state.questionIndex;

    if (currentQuestionIndex + 1 === questionCount) {
      clearLocalNotification ().then (setLocalNotification);
    }
  };

  onIncorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const questionCount = deck.questions.length;
    const answer = currentQuestion.answer;

    if (!answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    const currentQuestionIndex = this.state.questionIndex;

    if (currentQuestionIndex + 1 === questionCount) {
      clearLocalNotification ().then (setLocalNotification);
    }
  };

  onRestartQuiz = () => {
    this.setState ({
      questionIndex: 0,
      isFlipped: false,
      correctResult: 0,
    });
  };

  render () {
    const {deck, questionIndex} = this.state;

    if (questionIndex === undefined) {
      return <AppLoading />;
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

    if (questionIndex === questionCount) {
      return (
        <Container>
          <Content padder>
            <Card transparent>
              <CardItem header bordered>
                <NBText>
                  Your Success Rate: %
                  {Math.floor (this.state.correctResult / questionCount * 100)}
                </NBText>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <NBText>
                    Correct Questions Count :{this.state.correctResult}
                  </NBText>
                  <NBText>Total Question Count:{questionCount}</NBText>
                </Body>
              </CardItem>
              <CardItem footer bordered>

                <NBView style={{marginTop: 20}}>
                  <NBButton
                    style={styles.buttonSkyBlue}
                    onPress={() => this.onRestartQuiz ()}
                  >
                    <NBText style={{fontWeight: 'bold'}}>Restart Quiz</NBText>
                  </NBButton>
                </NBView>

                <NBView style={{marginTop: 20}}>
                  <NBButton
                    style={styles.buttonSkyBlue}
                    onPress={() => this.props.navigation.goBack ()}
                  >
                    <NBText style={{fontWeight: 'bold'}}>Back to Deck</NBText>
                  </NBButton>
                </NBView>

              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content padder>
          <Card transparent style={{alignItems: 'center'}}>
            <CardItem header bordered style={styles.centeredCardItem}>
              <NBText note>
                {questionIndex + 1 + ' of ' + questionCount}{' '}
              </NBText>
            </CardItem>

            <CardItem>
              <FlipComponent
                style={styles.flipComponent}
                isFlipped={this.state.isFlipped}
                frontView={
                  <NBView style={styles.flipView}>

                    <NBView style={styles.flipCenteredView}>

                      <NBText style={{textAlign: 'center'}}>
                        {currentQuestion.question}
                      </NBText>
                      <TouchableOpacity
                        onPress={this.onCorrect}
                        style={styles.correctionButtons}
                        light
                      >
                        <NBText>Correct</NBText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.onIncorrect}
                        style={styles.correctionButtons}
                        light
                      >
                        <NBText>Incorrect</NBText>
                      </TouchableOpacity>
                    </NBView>
                  </NBView>
                }
                backView={
                  <NBView style={styles.flipView}>

                    <NBView style={styles.flipCenteredView}>

                      <NBText style={{textAlign: 'center'}}>
                        {currentQuestion.answer ? 'Correct' : 'Incorrect'}
                      </NBText>

                    </NBView>
                  </NBView>
                }
              />
            </CardItem>

            <CardItem
              footer
              bordered
              button
              onPress={() => {
                this.setState ({isFlipped: !this.state.isFlipped});
              }}
              style={styles.questionAnswerButton}
            >
              <NBText style={{color: skyblue}}>
                {this.state.isFlipped ? 'Show Question' : 'Show Answer'}
              </NBText>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skyblue,
  },
  questionAnswerButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    height: 40,
    color: skyblue,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonSkyBlue: {
    backgroundColor: skyblue,
    margin: 10,
    justifyContent: 'center',
  },
  centeredCardItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipComponent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flipView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex: 1,
  },
  flipCenteredView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctionButtons: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    height: 40,
    backgroundColor: skyblue,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 10,
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
