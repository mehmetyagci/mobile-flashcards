import React from 'react';
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {AppLoading} from 'expo';
import {Container, Text} from 'native-base';
import * as Font from 'expo-font';
import FloatingButton from '../components/FloatingButton';
import {Ionicons} from '@expo/vector-icons';

import Header from '../components/Header';

export default class DeckListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
  };

  onPressFab = () => {
    this.props.navigation.navigate ('AddDeck');
  };

  async componentDidMount () {
    await Font.loadAsync ({
      Roboto: require ('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require ('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState ({isReady: true});
  }

  render () {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header />
        <StatusBar barStyle="light-content" />
        <Text>Open up DeckListScreen.js to start working on your app!</Text>
        <FloatingButton actionOnPress={this.onPressFab} />
      </Container>
    );
  }
}
