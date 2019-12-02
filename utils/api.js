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

    let unique = 29;
    console.log ('addCardToDeck' + unique);
    console.log ('deckId:', deckId);
    console.log ('card');
    console.log (card);

    let decksJSON = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('addCardToDeck->decksJSON' + unique);
    console.log (decksJSON);

    let decksArray = JSON.parse (decksJSON);
    console.log ('addCardToDeck->decksArray' + unique);
    console.log (decksArray);

    let filteredDeck = decksArray[deckId];
    console.log ('addCardToDeck->filteredDeck' + unique);
    console.log (filteredDeck);

    filteredDeck.questions.push (card);
    console.log ('filteredDeck');
    console.log (filteredDeck);

    const copy = {...decksArray}; // copy => { a: 1, b: 2, c: 3 }

    console.log ('copy' + unique);
    console.log (copy);

    //await AsyncStorage.setItem (DECK_STORAGE_KEY, JSON.stringify (copy));
    AsyncStorage.setItem (DECK_STORAGE_KEY, JSON.stringify (copy))
      .then (() => {
        console.log ('addCardToDeck operation succesfully completed');
      })
      .catch (error => {
        console.log (
          'There was an error addCardToDeck operation.Details:' + error
        );
      });

    let decksJSON2 = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('addCardToDeck->decksJSON2->result' + unique);
    console.log (decksJSON2);

    return copy;
  } catch (error) {
    console.log (error);
  }
};

export const addCardToDeck2 = async (deckId, card) => {
  try {
    //await AsyncStorage.removeItem (DECK_STORAGE_KEY);
    //await AsyncStorage.clear ();

    let unique = 31;
    console.log ('addCardToDeck' + unique);
    console.log ('deckId:', deckId);
    console.log ('card');
    console.log (card);

    let decksJSON = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('addCardToDeck->decksJSON' + unique);
    console.log (decksJSON);

    let decksArray = JSON.parse (decksJSON);
    console.log ('addCardToDeck->decksArray' + unique);
    console.log (decksArray);

    let filteredDeck = decksArray[deckId];
    console.log ('addCardToDeck->filteredDeck' + unique);
    console.log (filteredDeck);

    filteredDeck.questions.push (card);
    console.log ('filteredDeck');
    console.log (filteredDeck);

    var decks = await AsyncStorage.mergeItem (
      DECK_STORAGE_KEY,
      JSON.stringify ({
        [deckId]: filteredDeck,
      })
    );

    console.log ('decks' + unique);
    console.log (decks);

    let decksJSON2 = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    console.log ('addCardToDeck->decksJSON2->result' + unique);
    console.log (decksJSON2);

    //return copy;
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
