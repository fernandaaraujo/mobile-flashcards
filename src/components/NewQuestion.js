import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Button, Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { addCard, getDecks } from '../utils/api';
import { Input } from './Input';

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      decks: {}
    };
  }


  createDeck = () => {
    saveDeck(this.state.text).then((newDeck) => {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({
            routeName: 'DeckView',
            params: { deck: newDeck }
          })
        ]
       })

      this.props.navigation.dispatch(resetAction);
     });
   }

  createCard = () => {
    const { question, answer, decks } = this.state;
    const { title } = this.props.navigation.state.params.deck;
    const card = { question, answer };

    if (question === '' || answer === '') {
      alert('Please insert a question and answer');
      return;
    }

    addCard(title, card).then(() => {
      getDecks().then((decks) => {
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({
              routeName: 'DeckView',
              params: { deck: decks[title] }
            })
          ]
         })

       this.setState({ question: '', answer: '' });
       this.props.navigation.dispatch(resetAction);
       // this.props.navigation.navigate('DeckView', { deck: decks[title] });
      });
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={{ fontSize: 30 }}>
          Write a question and the answer
        </Text>
        <Input placeholder='Question' onChangeText={(question) => this.setState({ question })} />
        <Input placeholder='Answer' onChangeText={(answer) => this.setState({ answer })} />
        <Button title="Submit" onPress={this.createCard} />
      </KeyboardAvoidingView>
    )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
   }
 });

export default NewQuestion;
