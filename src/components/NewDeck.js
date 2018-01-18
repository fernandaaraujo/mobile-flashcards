import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Button, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input } from './Input';
import { saveDeck } from '../utils/api';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={{ fontSize: 30 }}>
          Deck title:
        </Text>
        <Input placeholder='Deck Title' onChangeText={(text) => this.setState({ text })} />
        <Button title="Submit" onPress={this.createDeck} />
      </KeyboardAvoidingView>)
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
 });

export default NewDeck;
