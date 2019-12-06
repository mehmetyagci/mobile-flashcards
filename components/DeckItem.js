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
import {deckQuestionCountMessage} from '../utils/_deck';

const {width} = Dimensions.get ('window');

class DeckItem extends Component {
  constructor (props) {
    super (props);
    console.log ('DeckItem->deck->constructor');
    console.log (props);
  }

  
  render () {
    const {title, questions} = this.props;

    let totalQuestionCount = deckQuestionCountMessage (questions);
    console.log ('totalQuestionCount5:', totalQuestionCount);

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>
            {title}
          </Text>
          <Text style={styles.text}>
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
