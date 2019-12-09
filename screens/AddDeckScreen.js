import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Form, Item, Input, Button, Text as NBText} from 'native-base';

import {skyblue} from '../utils/colors';

export default class AddDeckScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      text: '',
    };
  }

  onChangeText = event => {
    this.setState ({deck: event.nativeEvent.text});
  };

  onAddDeck = () => {
    if (this.state.deck === undefined || this.state.deck === '') {
      alert ('Please fill deck title');
      return;
    }
    this.props.navigation.state.params.saveDeck (this.state.deck);
    const saveCard = this.props.navigation.state.params.saveCard;
    this.props.navigation.navigate ('DeckDetail', {
      deckId: this.state.deck,
      saveCard: saveCard,
      questionCount: 0,
    });
  };

  render () {
    return (
      <View>
        <View style={{margin: 10}}>
          <Form>
            <Item>
              <Input
                value={this.state.deck}
                placeholder="Enter a new deck..."
                autoFocus
                clearButtonMode="always"
                autoCorrect={false}
                onChange={this.onChangeText}
                onSubmitEditing={this.onAddDeck}
                returnKeyType={'done'}
              />
            </Item>
          </Form>

          <View style={{marginTop: 20}}>
            <Button
              style={styles.button}
              onPress={this.state.deck && this.onAddDeck}
              disabled={!this.state.deck}
            >
              <NBText style={{fontWeight: 'bold'}}>Create Deck</NBText>
            </Button>
          </View>
        </View>
      </View>
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
