import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'MobileFlashcards:decks';

function setDummyData () {
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

  return dummyData;
}

export function formatDeckResults (results) {
  let returnValue = results === null ? setDummyData () : JSON.parse (results);
  return returnValue;
}

export function deckQuestionCountMessage (questions) {
  const questionsLength = questions.length;
  let result = '0 card';
  if (questions.length === 1) {
    result = '1 card';
  } else if (questions.length > 1) {
    result = questionsLength + ' cards';
  }
  return result;
}
