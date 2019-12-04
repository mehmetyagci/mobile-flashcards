import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DeckListScreen from '../screens/DeckListScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';

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
    }
  },
  {
    initialRouteName: 'DeckList',
    mode: 'modal',
  }
);

export default createAppContainer (AppNavigator);
