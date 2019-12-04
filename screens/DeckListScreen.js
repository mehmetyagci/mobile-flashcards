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
import {Button, Text as NBText, Segment, Item} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import _ from 'lodash';

import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';

import {
  getDecks,
  saveDecks,
  submitEntry,
  saveDeckTitle,
  addCardToDeck2,
  clear,
} from '../utils/api';

import DeckItem from '../components/DeckItem';
import StackNavigator from 'react-navigation-stack';
import {deckQuestionCountMessage} from  '../utils/_deck'
class DeckListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    decks: {},
    isReady: false,
  };

  componentDidMount () {
    console.group ('App->componentDidMount->Before');
    this.loadFonts ();
    this.loadDecks ();
    console.groupEnd ('App->componentDidMount->After');
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
      // console.log ('loadDecks->before');
      getDecks ().then (x => this.setState (() => ({decks: x, isReady: true})));
      // console.log ('loadDecks->this.state.decks:', this.state.decks);
    } catch (error) {
      console.log (error);
      alert (`Application Error. Cannot load data.Details:${error.messsage}`);
    }
  };

  onPressFab = () => {
    this.props.navigation.navigate ('AddDeck', {
      saveItem: this.addDeck,
    });
  };

  cb = deck => {
    console.log('cd',deck)
    this.props.navigation.navigate ('DeckDetail', {
      deck: deck,
    });
  };

  addDeck = title => {
    //console.log ('addDeck starting->title:', title);
    //const newDeck = {title: title, questions: []};
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
      // console.log ('addDeck->newState.decks', newState.decks);
      saveDecks (newState.decks);
      return {...newState};
    });
  };

  render () {
    const {decks, isReady} = this.state;
    //console.log ('DeckList->render->decks');
    //console.log (decks);

    const decksValues = _.values (decks);
    //console.log ('DeckList->render->decksValues:', decksValues);

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <StatusBar barStyle="light-content" />

        <FlatList
          data={decksValues}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.cb (item)}>
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
