import React, { Component } from 'react';
import { Alert, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { clearDecks, getDecks } from '../utils/api';

class ListDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      
    };
  }

  clearAllDecks = () => {
    Alert.alert(
      'Clear all',
      'This will delete all decks. Are you sure?',
      [
        { text: 'Yes',
          onPress: () =>
            clearDecks().then(() => this.setState({ decks: {} }))
        },
        { text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'), style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  componentWillMount() {
    getDecks().then(decks => this.setState({ decks }))
  }

  goToDeck = (deck) => {
    this.props.navigation.navigate('DeckView', { deck: deck })
  }

  renderDeck = ({ item }) => {
    return (
      <TouchableOpacity id={item.id} style={styles.deckContainer} onPress={() => this.goToDeck(item)}>
        <Text style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.cardsQuantity}>
          {item.questions.length} cards
        </Text>
    </TouchableOpacity>)
  };

  render() {
    const { decks } = this.state;
    const deckList = Object.keys(decks).map(title => decks[title]);

    return (
      <View style={{ flex: 1 }}>
      {
        deckList.length > 0 ?
          <View style={{ flex: 1 }}>
            <Icon
              iconStyle={{ paddingTop: 20, fontSize: 30 }}
              title="Clear all decks"
              name='trash-o'
              type='font-awesome'
              onPress={this.clearAllDecks}
            />
            <FlatList
              data={deckList}
              keyExtractor={(deck, index) => deck.title}
              renderItem={this.renderDeck}
            />
          </View> :
          <View style={styles.containerEmptyList}>
            <Text style={styles.emptyDeckList}>
              {"You don't have created decks. Please insert one to start."}
            </Text>
          </View>
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  cardsQuantity: {
    textAlign: 'center',
    color: 'grey'
  },
  deckContainer: {
    paddingBottom: 50,
    paddingTop: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  containerEmptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  emptyDeckList: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 30,
    marginBottom: 20
  }
});

export default ListDecks;
