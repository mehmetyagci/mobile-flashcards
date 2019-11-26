import {AsyncStorage} from 'react-native';
import {DECK_STORAGE_KEY, formatDeckResults} from './_deck';

// export function formatMobileCardResults (results) {
//   return results == null ? setDummyData () : JSON.parse (results);
// }

export function getDecks () {
  console.group ('api->getDecks');
  var decks = AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
  console.log (`decks:${decks}`);
  console.groupEnd ('api->getDecks');
  return decks;
}

export function saveDeckTitle (newTitle) {
  console.group ('api->saveDeckTitletDecks');
  var newDeck = {title: newTitle, questions: []};
  console.log ('newDeck:', newDeck);
  console.log ('JSON.stringify(newDeck):', JSON.stringify (newDeck));

  var decks = AsyncStorage.mergeItem (
    DECK_STORAGE_KEY,
    JSON.stringify ({
      [newTitle]: newDeck,
    })
  );

  console.log (`decks:${decks}`);
  console.groupEnd ('api->saveDeckTitle');
  return decks;
}

// export function getDeck (id) {
//   return AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
// }

// // ALL AsyncStorage get operations have to use this method
async function retrieveItem (key) {
  try {
    console.log ('api->retrieveItem->key', key);
    const retrievedItem = await AsyncStorage.getItem (key);
    const item = JSON.parse (retrievedItem);
    return item;
  } catch (error) {
    console.log (error.message);
  }
  return;
}

// // ALL AsyncStorage set operations have to use this method
async function storeItem (key, item) {
  try {
    let jsonOfItem = await AsyncStorage.setItem (key, JSON.stringify (item));
    return jsonOfItem;
  } catch (error) {
    console.log (error);
  }
}
