import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {whiteSmoke, gray, purple} from '../utils/colors';
import {white} from 'ansi-colors';

export default class DeckList extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {decks} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Decks</Text>
        {Object.keys (decks).map (key => {
          const {title, questions} = decks[key];
          console.log (`title:${title}`);
          console.log (`questions:${questions[0].answer}`);

          return (
            <View key={key} style={styles.itemBlock}>
              <TouchableOpacity
                onPress={() => alert ('decklist deck pressed!')}
              >
                <View style={styles.itemMeta}>
                  <Text style={styles.itemName}>{title}</Text>
                  <Text style={styles.itemQuestionInfo}>
                    {questions.length} cards
                  </Text>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: whiteSmoke,
  },
  itemBlock: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    marginTop: 12,
  },
  itemMeta: {
    justifyContent: 'center',
  },
  itemName: {
    color: purple,
    fontSize: 36,
    fontWeight: 'bold',
  },
  itemQuestionInfo: {
    fontSize: 22,
    color: gray,
  },
  headerText: {
    fontSize: 44,
    textAlign: 'center',
  },
  separator: {
    height: 0.5,
    width: '80%',
    alignSelf: 'auto',
    backgroundColor: purple,
  },
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteSmoke,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
  deckText: {
    color: purple,
    fontSize: 36,
    textAlign: 'center',
  },
  questionText: {
    color: gray,
    fontSize: 22,
    textAlign: 'center',
  },
});
