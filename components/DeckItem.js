import React, {Component} from 'react';
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

class DeckItem extends Component {
  constructor (props) {
    super (props);
    console.log ('DeckItem->deck');
    console.log (props);
  }

  questionCountMessage (questionsLength) {
    console.log ('questionCountMessage->deck:', questionsLength);
    if (questionsLength === 0) {
      return <Text style={styles.text}>0 card</Text>;
    } else if (questionsLength === 1) {
      return <Text style={styles.text}>1 card</Text>;
    } else {
      return <Text style={styles.text}>{questionsLength} cards</Text>;
    }
  }

  render () {
    const {deck} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>

          <Text style={styles.text}>
            {deck.title}
          </Text>
          {this.questionCountMessage (deck.questions.length)}
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
