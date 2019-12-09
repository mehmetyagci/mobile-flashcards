import {AsyncStorage} from 'react-native';
import {DECK_STORAGE_KEY, formatDeckResults} from './_deck';

export function clear () {
  console.log ('clear');
  AsyncStorage.removeItem (DECK_STORAGE_KEY);
}

export function getDecks () {
  AsyncStorage.removeItem ('MobileFlashcards:notifications').then (() =>
    console.log ('MobileFlashcards:notifications->RemovedItem')
  );

  AsyncStorage.removeItem (DECK_STORAGE_KEY).then (() =>
    console.log ('RemovedItem')
  );
  AsyncStorage.clear ().then (() => console.log ('Cleared'));

  var decks = AsyncStorage.getItem (DECK_STORAGE_KEY).then (formatDeckResults);
  return decks;
}

// This function is async
export const getDeck = async id => {
  try {
    let decksJSON = await AsyncStorage.getItem (DECK_STORAGE_KEY);
    let decksArray = JSON.parse (decksJSON);

    let filteredDeck = decksArray[id];

    return filteredDeck;
  } catch (error) {
    console.log (error);
  }
};

export function saveDecks (newDecks) {
  AsyncStorage.setItem (DECK_STORAGE_KEY, JSON.stringify (newDecks));
}