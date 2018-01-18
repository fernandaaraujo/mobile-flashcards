import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class DeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {}
    };
  }

  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>
            {deck.title}
          </Text>
          <Text style={styles.quantity}>
            {deck.questions.length} cards
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button title='Add Card' onPress={() => this.props.navigation.navigate('NewQuestion', { deck: deck })} />
          <Button title='Start Quiz' onPress={() => this.props.navigation.navigate('DeckQuiz', { deck: deck })} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleGroup: {
    flex: 0.6,
    justifyContent: 'center'
  },
  buttons: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  quantity: {
    textAlign: 'center',
    fontSize: 25,
    color: 'grey'
  }
});

export default DeckView;
