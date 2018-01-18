import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_KEY = "MobileFlashcards:deck";

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
          .then(decks => JSON.parse(decks) || {})
}

export function clearDecks() {
  return AsyncStorage.clear()
}

export function saveDeck(title) {
    const newDeck = { title, questions: [] }
    return AsyncStorage.mergeItem(
      MOBILE_FLASHCARDS_KEY,
      JSON.stringify({ [newDeck.title]: newDeck }))
        .then(() => newDeck)
}

export function addCard(title, card) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const newData = {
        ...data,
        [title]: {
          ...data[title],
          questions: data[title].questions.concat(card)
        }
      }
      AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(newData))
    })
}
