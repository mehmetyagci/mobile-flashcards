import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text as NBText,
  Button,
} from 'native-base';
import {AppLoading} from 'expo';
import {deckQuestionCountMessage} from '../utils/_deck';

import {getDeck} from '../utils/api';
import {skyblue} from '../utils/colors';
export default class DeckDetailScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      deck: {},
    };
  }

  componentDidMount () {
    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;
    this.fetchData (deckId);
  }

  componentWillMount () {
    console.log ('DeckDetailScreen->componentWillMount3');
  }

  fetchData = async deckId => {
    const filteredDeck = await getDeck (deckId);

    this.setState ({deck: filteredDeck});
  };

  onPressQuiz = () => {
    const {deck} = this.state;
    const deckId = deck.title;
    this.props.navigation.navigate ('Quiz', {
      deckId: deckId,
    });
  };

  onPressAddCard = () => {
    const {params} = this.props.navigation.state;
    const {deck} = this.state;
    const deckId = deck.title;
    const saveCard = params.saveCard;
    this.props.navigation.navigate ('AddCard', {
      deckId: deckId,
      saveCard: saveCard,
      onGoBack: () => this.fetchData (deckId),
    });
  };

  render () {
    const {deck} = this.state;

    console.log (deck);

    if (deck === undefined) {
      return <View><Text>Deck not found!</Text></View>;
    }

    if (deck.title === undefined) {
      return <AppLoading />;
    }

    let totalQuestionCount = deckQuestionCountMessage (deck.questions);

    return (
      <Container>
        <Content
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
            paddingHorizontal: 10,
          }}
        >
          <Card>
            <CardItem header>
              <NBText>{deck.title}</NBText>
            </CardItem>
            <CardItem bordered>
              <NBText>
                {totalQuestionCount}
              </NBText>
            </CardItem>
          </Card>

          <View style={{marginTop: 20}}>
            <Button style={styles.button} onPress={() => this.onPressQuiz ()}>
              <NBText style={{fontWeight: 'bold'}}>Start Quiz</NBText>
            </Button>
          </View>

          <View style={{marginTop: 20}}>
            <Button
              style={styles.button}
              onPress={() => this.onPressAddCard ()}
            >
              <NBText style={{fontWeight: 'bold'}}>Add Card</NBText>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  button: {
    backgroundColor: skyblue,
    margin: 25,
    justifyContent: 'center',
  },
});
