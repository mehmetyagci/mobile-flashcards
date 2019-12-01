import {AsyncStorage} from 'react-native';
import {DECK_STORAGE_KEY, formatDeckResults} from './_deck';

export function clear () {
  console.log ('clear');
  AsyncStorage.removeItem (DECK_STORAGE_KEY);
}

export function getDecks () {
  console.group ('api->getDecks');
  var decks = AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
  console.log (`decks:${decks}`);
  console.groupEnd ('api->getDecks');
  return decks;
}

// This function is async
export const getDeck = async id => {
  try {
    //await AsyncStorage.removeItem (DECK_STORAGE_KEY);
    //await AsyncStorage.clear ();

    let unique = 1;
    console.log ('getDeck' + unique);
    console.log ('id:', id);
    let decksJSON = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('decksJSON');
    console.log (decksJSON);
    let decksArray = JSON.parse (decksJSON);
    console.log ('decksArray');
    console.log (decksArray);

    let filteredDeck = decksArray[id];
    console.log ('filteredDeck');
    console.log (filteredDeck);

    return filteredDeck;
  } catch (error) {
    console.log (error);
  }
};

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

// addCardToDeck

export const addCardToDeck = async (deckId, card) => {
  try {
    //await AsyncStorage.removeItem (DECK_STORAGE_KEY);
    //await AsyncStorage.clear ();

    let unique = 1;
    console.log ('addCardToDeck' + unique);
    console.log ('deckId:', deckId);
    let decksJSON = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('decksJSON');
    console.log (decksJSON);

    let decksArray = JSON.parse (decksJSON);
    console.log ('decksArray');
    console.log (decksArray);

    let filteredDeck = decksArray[id];
    console.log ('filteredDeck');
    console.log (filteredDeck);

    filteredDeck.questions.push (card);

    const copy = {...decksArray, deckId: filteredDeck}; // copy => { a: 1, b: 2, c: 3 }

    console.log ('copy' + unique);
    console.log (copy);
    // {
    //   question: 'React is a front-end JavaScript library developed by Facebook in 2011.',
    //   answer: true,
    // },

    return copy;
  } catch (error) {
    console.log (error);
  }
};

// export function getDeck (id) {
//   return AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
// }

// // // ALL AsyncStorage get operations have to use this method
// async function retrieveItem (key) {
//   try {
//     console.log ('api->retrieveItem->key', key);
//     const retrievedItem = await AsyncStorage.getItem (key);
//     const item = JSON.parse (retrievedItem);
//     return item;
//   } catch (error) {
//     console.log (error.message);
//   }
//   return;
// }

// // // ALL AsyncStorage set operations have to use this method
// async function storeItem (key, item) {
//   try {
//     let jsonOfItem = await AsyncStorage.setItem (key, JSON.stringify (item));
//     return jsonOfItem;
//   } catch (error) {
//     console.log (error);
//   }
// }
