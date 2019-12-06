import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DeckListScreen from '../screens/DeckListScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import AddCardScreen from '../screens/AddCardScreen';

const AppNavigator = createStackNavigator (
  {
    DeckList: {
      screen: DeckListScreen,
    },
    AddDeck: {
      screen: AddDeckScreen,
    },
    DeckDetail: {
      screen: DeckDetailScreen,
    },
    Quiz: {
      screen: QuizScreen,
    },
    AddCard: {
      screen: AddCardScreen
    }
  },
  {
    initialRouteName: 'DeckList',
    mode: 'modal',
  }
);

export default createAppContainer (AppNavigator);
