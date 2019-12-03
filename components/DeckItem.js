import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import {white, whiteSmoke, gray, skyblue} from '../utils/colors';

const {width} = Dimensions.get ('window');

const DeckItem = ({deck}) => {
  console.log ('DeckItem->deck');
  console.log (deck);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>

        <Text style={styles.text}>
          {deck.title}
        </Text>
        <Text style={styles.text}>
          {deck.questions.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    borderBottomColor: '#5859f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#4F50DC',
    fontSize: 18,
    marginVertical: 20,
    paddingLeft: 10,
  },

  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
  },
});

export default DeckItem;
