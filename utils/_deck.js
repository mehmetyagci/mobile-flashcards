import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'MobileFlashcards:deck';

function setDummyData () {
  console.group ('_deck->setDummyData');
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'React is a front-end JavaScript library developed by Facebook in 2011.',
          answer: true,
        },
        {
          question: 'React follows the component based approach which helps in building reusable UI components.',
          answer: true,
        },
        {
          question: 'React is used for developing complex and interactive web and mobile UI.',
          answer: true,
        },
        {
          question: 'React uses the real DOM instead of the virtual DOM.',
          answer: false,
        },
        {
          question: 'React follows two-directional data flow or data binding.',
          answer: false,
        },
      ],
    },
    Javascript: {
      title: 'Javascript',
      questions: [
        {
          question: 'JavaScript is is complementary to and integrated with HTML.',
          answer: true,
        },
      ],
    },
    SQL: {
      title: 'SQL',
      questions: [],
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
