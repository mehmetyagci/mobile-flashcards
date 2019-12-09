import React from 'react';
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import _ from 'lodash';

import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';

import {
  getDecks,
  saveDecks,
} from '../utils/api';

import DeckItem from '../components/DeckItem';

class DeckListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    decks: {},
    isReady: false,
  };

  componentDidMount () {
    this.loadFonts ();
    this.loadDecks ();
  }

  loadFonts = async () => {
    try {
      await Font.loadAsync ({
        Roboto: require ('../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require ('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    } catch (error) {
      console.log (error);
      alert (`Application Error. Cannot load fonts.Details:${error.messsage}`);
    }
  };

  loadDecks = async () => {
    try {
      getDecks ().then (x => this.setState (() => ({decks: x, isReady: true})));
    } catch (error) {
      console.log (error);
      alert (`Application Error. Cannot load data.Details:${error.messsage}`);
    }
  };

  onPressFab = () => {
    this.props.navigation.navigate ('AddDeck', {
      saveDeck: this.addDeck,
      saveCard: this.addCard,
    });
  };

  onPressDeckDetail = deck => {
    this.props.navigation.navigate ('DeckDetail', {
      deckId: deck.title,
      saveCard: this.addCard,
      questionCount: deck.questions.length,
    });
  };

  addDeck = title => {
    const newDeckObject = {
      [title]: {
        title: title,
        questions: [],
      },
    };

    this.setState (prevState => {
      const newState = {
        ...prevState,
        decks: {
          ...newDeckObject,
          ...prevState.decks,
        },
      };
      saveDecks (newState.decks);
      return {...newState};
    });
  };

  addCard = (deckId, card) => {
    this.setState (prevState => {
      const {decks} = prevState;

      decks[deckId].questions = Object.assign (
        decks[deckId].questions.concat (card)
      );

      saveDecks (decks);
      return {decks};
    });
  };

  render () {
    const {decks, isReady} = this.state;

    const decksValues = _.values (decks);

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header title={'Decks'} />
        <StatusBar barStyle="light-content" />

        <FlatList
          data={decksValues}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.onPressDeckDetail (item)}>
              <DeckItem title={item.title} questions={item.questions} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />

        <FloatingButton actionOnPress={this.onPressFab} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DeckListScreen;
