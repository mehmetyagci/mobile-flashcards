import React, {Component} from 'react';
import {View} from 'react-native';
import {Form, Item, Input, Button, Text as NBText} from 'native-base';

import {whiteSmoke, purple, skyblue} from '../utils/colors';

export default class AddDeckScreen extends Component {
  constructor (props) {
    super (props);
    console.log ('AddDeck->props:', props);
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
    console.log ('AddDeckScreen->onAddDeck->deck', this.state.deck);
    this.props.navigation.state.params.saveItem (this.state.deck);
    this.props.navigation.goBack ();
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
              style={{
                backgroundColor: '#5067FF',
                margin: 25,
                justifyContent: 'center',
              }}
              onPress={this.state.deck && this.onAddDeck}
              disabled={!this.state.deck}
            >
              <NBText style={{fontWeight: 'bold'}}>Add Deck</NBText>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
