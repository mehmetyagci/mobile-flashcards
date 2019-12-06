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
} from 'native-base';
import {deckQuestionCountMessage} from '../utils/_deck';

export default class DeckDetailScreen extends Component {
  onPressQuiz = () => {
    const {params} = this.props.navigation.state;
    const deck = params ? params.deck : undefined;
    const deckId = deck.title;
    console.log ('onPressQuiz:deckId', deckId);
    this.props.navigation.navigate ('Quiz', {
      deckId: deckId,
    });
  };

  onPressAddCard = () => {
    const {params} = this.props.navigation.state;
    const deck = params ? params.deck : undefined;
    const deckId = deck.title;
    const saveCard = params.saveCard;
    console.log ('DeckDetailScreen->onPressAddCard:deckId', deckId);
    this.props.navigation.navigate ('AddCard', {
      deckId: deckId,
      saveCard: saveCard,
    });
  };


  componentDidMount() 
  {
    console.log('DeckDetailScreen->componentDidMount1')
  }

  componentWillMount(){
    console.log('DeckDetailScreen->componentWillMount1')

  }

  render () {
    console.log ('DeckDetailScreen render');
    const {params} = this.props.navigation.state;
    const deck = params ? params.deck : undefined;

    console.log (deck);

    if (deck === undefined) {
      return <View><Text>Deck not found!</Text></View>;
    }

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
                backgroundColor: '#5067FF',
                margin: 25,
                justifyContent: 'center',
              }}
              onPress={() => this.onPressAddCard ()}
            >
              <NBText style={{fontWeight: 'bold'}}>Add Card</NBText>
            </Button>
          </View>

          <View style={{marginTop: 20}}>
            <Button
              style={{
                backgroundColor: '#5067FF',
                margin: 25,
                justifyContent: 'center',
              }}
              onPress={() => this.onPressQuiz ()}
            >
              <NBText style={{fontWeight: 'bold'}}>Start Quiz</NBText>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
