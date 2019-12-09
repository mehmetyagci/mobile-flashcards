
# Mobile Flashcards

Mobile Flashcards is the third and final project for the Udacity React Nanodegree program. It was build with using React Native a mobile application platform which allows to develop for Android and iOS using one code base.  

The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.



## Application Functionality

### Decks List Screen

* The primary view, seen when the app loads, is a list of created decks 
  which includes the name of each deck and the number of cards.
  
* Pressing on a deck in the list the app should route to an individual deck view.

### New Deck Screen

* The view includes:

    * a form for creating a new deck.
    * an input for the title and a 'Create Deck' button.
    
* Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.

### Deck View Screen

* The individual deck view includes:

    * The deck title
    * Number of cards in the deck
    * Option to start a quiz for that deck
    * Option to add a new question to the deck

### New Question  Screen
    
* The New Question view includes:

    * a form with fields for a question 
    * and answer, and a submit button.
    
* Submitting the form correctly adds the question to the deck.

### Quiz Screen

* The Quiz view starts with a question from the selected deck.
* The question is displayed, along with a button to show the answer.
* Pressing the 'Show Answer' button displays the answer.
* Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
* The view displays the number of questions remaining.
* When the last question is answered, a score is displayed.
* When the score is displayed, buttons are displayed 
to either start the quiz over or go back to the Individual Deck view.

### Notifications

* Notifications are generated at a specific time 
* if the user hasn't completed at least one quiz for that day.

 ![alt text](./assets/quiz-notification.png "Notification Quiz")

### To get started this project right away:

* Checkout this repository
* install all project dependencies 
* start the development server 

```
> git clone https://github.com/the-dsw/mobile-flashCards.git
> cd mobile-flashCards
> npm install or yarn install
> npm start or yarn start
```