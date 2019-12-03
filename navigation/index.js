import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DeckListScreen from '../screens/DeckListScreen';
import AddDeckScreen from '../screens/AddDeckScreen';

const AppNavigator = createStackNavigator (
  {
    DeckList: {
      screen: DeckListScreen,
    },
    AddDeck: {
      screen: AddDeckScreen,
    },
  },
  {
    initialRouteName: 'DeckList',
    mode: 'modal',
  }
);

export default createAppContainer (AppNavigator);
