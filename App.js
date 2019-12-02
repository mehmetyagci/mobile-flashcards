import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Quiz from './components/Quiz';
import FlipTest1 from './components/FlipTest1';
import AddCardToDeck from './components/AddCardToDeck';
import Deck from './components/Deck';

import {getDecks, saveDeckTitle, addCardToDeck2, clear} from './utils/api';

import {AppLoading} from 'expo';

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ready: false,
      decks: {},
    };
  }

  componentDidMount () {
    console.group ('App->componentDidMount->Before');
    this.retrieveDecks ();
    console.groupEnd ('App->componentDidMount->After');
  }

  retrieveDecks () {
    try {
      console.log ('retrieveDecks->before');
      //getDecks ().then (x => this.setState ({decks: x, ready: true}));
      getDecks ().then (x => this.setState (() => ({decks: x, ready: true})));
      //getDecks ().then(x =>  this.setState ({decks: x})   );
      console.log ('retrieveDecks->this.state.decks:', this.state.decks);
    } catch (error) {
      console.log (error.messsage);
    }
  }

  handleAddDeck = newDeck => {
    console.log ('handleAddDeck->Parent received value from child: ' + newDeck);
    saveDeckTitle (newDeck);
    this.retrieveDecks ();
  };

  handleAddCardToDeck = (deckId, card) => {
    console.log (`handleAddCardToDeck->deckId:'${deckId} card:${card}`);

    (async () => {
      await addCardToDeck2 (deckId, card);
    }) ();

    this.retrieveDecks ();
  };

  handleClearAsyncstorage () {
    alert ('handleClearAsyncstorage');
    clear ();
    //this.retrieveDecks ();
  }

  render () {
    const {decks, ready} = this.state;
    // console.log ('App->render->decks:', decks);
    // console.log ('App->render->keys:', Object.keys (decks));
    // console.log ('App->render->values:', Object.values (decks));

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Quiz deckId={'React'} />  */}
          {console.log ('App-Render-state:', this.state.decks)}
          <DeckList decks={this.state.decks} />
          {/* <AddCardToDeck addCardToDeckCallback={this.handleAddCardToDeck} /> */}
          <Deck deckId="SQL" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
