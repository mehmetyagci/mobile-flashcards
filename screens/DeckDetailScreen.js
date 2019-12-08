import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text as NBText,
  Body,
  Button,
  Form,
  Item,
  Header,
  Left,
  Right,
  Icon,
  Title,
} from 'native-base';

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
    console.log ('DeckDetailScreen->componentDidMount3');

    const {params} = this.props.navigation.state;
    const deckId = params ? params.deckId : undefined;
    console.log ('DeckDetailScreen->componentDidMount->deckId:', deckId);
    this.fetchData (deckId);
  }

  componentWillMount () {
    console.log ('DeckDetailScreen->componentWillMount3');
  }

  // shouldComponentUpdate (nextProps) {
  //   console.log ('shouldComponentUpdate');
  //   return (
  //     nextProps.deck.questions.length !== null &&
  //     !nextProps.deck.questions.length
  //   );
  // }

  fetchData = async deckId => {
    //alert ('fetchData');
    console.log ('DeckDetailScreen->fetchData');
    const filteredDeck = await getDeck (deckId);
    console.log ('fetcData->filteredDeck');
    console.log (filteredDeck);

    console.log ('filteredDeck.questions');
    console.log (filteredDeck.questions);
    this.setState ({deck: filteredDeck});
    console.log ('this.state.deck.title:', this.state.deck.title);
  };

  onPressQuiz = () => {
    const {deck} = this.state;
    const deckId = deck.title;
    console.log ('onPressQuiz:deckId', deckId);
    this.props.navigation.navigate ('Quiz', {
      deckId: deckId,
    });
  };

  onPressAddCard = () => {
    const {params} = this.props.navigation.state;
    const {deck} = this.state;
    const deckId = deck.title;
    const saveCard = params.saveCard;
    console.log ('DeckDetailScreen->onPressAddCard:deckId', deckId);
    this.props.navigation.navigate ('AddCard', {
      deckId: deckId,
      saveCard: saveCard,
      onGoBack: () => this.fetchData (deckId),
    });
  };

  render () {
    console.log ('DeckDetailScreen->render2');
    const {deck} = this.state;

    console.log (deck);

    if (deck === undefined) {
      return <View><Text>Deck not found!</Text></View>;
    }

    if (deck.title === undefined) {
      return <View><Text>Loading...</Text></View>;
    }

    // console.log ('dd->r->ql', deck.questions.length);
    // alert ('dd->r->ql', deck.questions.length);

    let totalQuestionCount = deckQuestionCountMessage (deck.questions);
    //console.log ('totalQuestionCount5:', totalQuestionCount);

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
            <Button
              style={{
                backgroundColor: skyblue,
                margin: 25,
                justifyContent: 'center',
              }}
              onPress={() => this.onPressQuiz ()}
            >
              <NBText style={{fontWeight: 'bold'}}>Start Quiz</NBText>
            </Button>
          </View>

          <View style={{marginTop: 20}}>
            <Button
              style={{
                backgroundColor: skyblue,
                margin: 25,
                justifyContent: 'center',
              }}
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
