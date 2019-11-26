import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'MobileFlashcards:deck';

function setDummyData () {
  console.group ('_deck->setDummyData');
  const dummyData = {
    react: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    javascript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  };

  AsyncStorage.setItem (DECK_STORAGE_KEY, JSON.stringify (dummyData));

  console.groupEnd ('_deck->setDummyData');
  return dummyData;
}

export function formatDeckResults (results) {
  console.group ('api->formatDeckResults');
  console.log (`results:${results}`);
  let returnValue = results === null ? setDummyData () : JSON.parse (results);
  console.log (`returnValue:${returnValue}`);
  console.log (`Object.keys(returnValue):${Object.keys (returnValue)}`);
  console.log (`Object.values(returnValue):${Object.values (returnValue)}`);
  console.groupEnd ('api->formatDeckResults');
  return returnValue;
}
