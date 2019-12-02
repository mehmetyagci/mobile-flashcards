import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {getDeck} from '../utils/api';

export default class Deck extends Component {
  constructor (props) {
    super (props);
    this.state = {
      deck: null,
    };
  }

  componentDidMount () {
    console.log ('Quiz->componentDidMount');
    const {deckId} = this.props;

    this.fetchData (deckId);
  }

  fetchData = async deckId => {
    console.log ('Quiz->fetchData');
    const filteredDeck = await getDeck (deckId);
    console.log ('fetcData->filteredDeck');
    console.log (filteredDeck);

    console.log ('filteredDeck.questions');
    console.log (filteredDeck.questions);
    this.setState ({deck: filteredDeck, questionIndex: 0});
    console.log ('this.state.deck.title:', this.state.deck.title);
    console.log ('this.state.questionIndex:', this.state.questionIndex);
  };

  render () {
    const {deck} = this.state;

    if (deck === null) {
      return <View><Text>Loading...</Text></View>;
    }

    if (deck === undefined) {
      return <View><Text>Deck not found!</Text></View>;
    }

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>
          {deck.questions !== undefined ? deck.questions.length : 0} cards
        </Text>
        <TouchableOpacity onPress={() => alert ('Add Card!')}>
          <View>
            <Text>Add Card</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert ('Start Quiz!')}>
          <View>
            <Text>Start Quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
