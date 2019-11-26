import {AsyncStorage} from 'react-native';
import {DECK_STORAGE_KEY, formatDeckResults} from './_deck';

// export function formatMobileCardResults (results) {
//   return results == null ? setDummyData () : JSON.parse (results);
// }

export function getDecks () {
  // AsyncStorage.getItem (DECK_STORAGE_KEY).then (data => {
  //   console.group ('api->getDecks');
  //   console.log (`data:${data}`);
  //   if(data === null) {
  //     console.log (`data:undefined`);
  //     decks2 = setDummyData();
  //     console.log('decks2:',decks2);
  //     return decks2;
  //   }
  //   console.groupEnd ('api->getDecks');

  //   const decks2 = JSON.parse (data);
  //   return decks2;
  // });

  console.group ('api->getDecks');
  var decks = AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
  console.log (`decks:${decks}`);
  console.groupEnd ('api->getDecks');
  return decks;
  // this.retrieveItem(DECK_STORAGE_KEY).then((decks) => {

  // }).catch((error) => {
  //   console.log('Promise is rejected with error: ' + error);
  // });
  // console.log ('api->getDecks');
  // const retrievedItem = retrieveItem (DECK_STORAGE_KEY);
  // console.log ('api->getDecks->retrievedItem', retrievedItem);
  // if (retrievedItem === undefined) {
  //   console.log ('api->getDecks->retrievedItem:null');
  //   retrievedItem = this.setDummyData ();
  //   console.log ('api->getDecks->retrievedItem:', retrievedItem);
  // }
  // return retrievedItem;
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
