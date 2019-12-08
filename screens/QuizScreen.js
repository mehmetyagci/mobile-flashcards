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
  Form,
  Item,
  Header,
  Left,
  Right,
  Icon,
  Title,
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
    //console.log ('QuizScreen->fetchData');
    const filteredDeck = await getDeck (deckId);
    // console.log ('fetcData->filteredDeck');
    // console.log (filteredDeck);

    // console.log ('filteredDeck.questions');
    // console.log (filteredDeck.questions);
    this.setState ({deck: filteredDeck, questionIndex: 0});
    //   console.log ('this.state.deck.title:', this.state.deck.title);
    //   console.log ('this.state.questionIndex:', this.state.questionIndex);
  };

  onCorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const questionCount = deck.questions.length;
    const answer = currentQuestion.answer;

    // console.log ('answer1');
    // console.log (answer);
    // console.log (deck.questions);
    // console.log (deck.questions.length);

    if (answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    const currentQuestionIndex = this.state.questionIndex;
    console.log (
      `onCorrect->check decks completed->currentQuestionIndex:${currentQuestionIndex} questionCount:${questionCount}`
    );
    if (currentQuestionIndex + 1 === questionCount) {
      // alert (
      //   'Test completed and clearLocalNotification and setLocalNotification worked.'
      // );
      clearLocalNotification ().then (setLocalNotification);
    }
  };

  onIncorrect = () => {
    const {deck, questionIndex} = this.state;

    const currentQuestion = deck.questions[questionIndex];
    const questionCount = deck.questions.length;
    const answer = currentQuestion.answer;
    // console.log ('answer2');
    // console.log (answer);

    if (!answer) {
      this.setState ({correctResult: this.state.correctResult + 1});
    }

    this.setState ({questionIndex: this.state.questionIndex + 1});
    const currentQuestionIndex = this.state.questionIndex;

    console.log (
      `onIncorrect->check decks completed->currentQuestionIndex:${currentQuestionIndex} questionCount:${questionCount}`
    );
    if (currentQuestionIndex + 1 === questionCount) {
      // alert (
      //   'Test completed and clearLocalNotification and setLocalNotification worked.'
      // );
      clearLocalNotification ().then (setLocalNotification);
    }
  };

  render () {
    const {deck, questionIndex} = this.state;

    // console.log ('render->deck');
    // console.log (deck);

    // console.log ('render->questionIndex');
    // console.log (questionIndex);

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

    // console.log ('currentQuestion');
    // console.log (currentQuestion);

    // console.log ('currentQuestion.answer');
    // console.log (currentQuestion.answer);

    // console.log ('questionCount');
    // console.log (questionCount);

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
                  <NBText>Total Question Count:{questionCount}</NBText>
                  <NBText>
                    Your Correct Questions Count :{this.state.correctResult}
                  </NBText>
                </Body>
              </CardItem>
              <CardItem footer bordered />
            </Card>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content padder>
          <Card transparent style={{alignItems: 'center'}}>
            <CardItem
              header
              bordered
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NBText note>
                {questionIndex + 1 + ' of ' + questionCount}{' '}
              </NBText>
            </CardItem>

            <CardItem>
              <FlipComponent
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                isFlipped={this.state.isFlipped}
                frontView={
                  <NBView
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >

                    <NBView
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

                      <NBText style={{textAlign: 'center'}}>
                        {currentQuestion.question}
                      </NBText>
                      <TouchableOpacity
                        onPress={this.onCorrect}
                        style={{
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
                        }}
                      >
                        <NBText>Correct</NBText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.onIncorrect}
                        style={{
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
                        }}
                        light
                      >
                        <NBText>Incorrect</NBText>
                      </TouchableOpacity>
                    </NBView>
                  </NBView>
                }
                backView={
                  <NBView
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >

                    <NBView
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

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
              <NBText>
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
