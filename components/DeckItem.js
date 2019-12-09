import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {gray, skyblue} from '../utils/colors';
import {deckQuestionCountMessage} from '../utils/_deck';

const {width} = Dimensions.get ('window');

class DeckItem extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {title, questions} = this.props;

    let totalQuestionCount = deckQuestionCountMessage (questions);

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.question}>
            {totalQuestionCount}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    borderBottomColor: '#5859f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: skyblue,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: 10,
  },

  question: {
    color: gray,
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
