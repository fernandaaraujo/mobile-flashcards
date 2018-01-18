import React, { Component } from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { setLocalNotification } from "./src/utils/helpers";
import DeckQuiz from "./src/components/DeckQuiz";
import DeckView from "./src/components/DeckView";
import ListDecks from "./src/components/ListDecks";
import NewDeck from "./src/components/NewDeck";
import NewQuestion from "./src/components/NewQuestion";
import QuizView from "./src/components/QuizView";
import Result from "./src/components/Result";

const MobileFlashCardStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
};

const Tabs = TabNavigator({
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-one' size={30} color={tintColor} />
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Decks',
      headerBackTitle: 'Back',
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: ({navigation}) => ({
      headerBackTitle: 'Back',
      title: "Quiz",
    })
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({navigation}) => ({
      headerBackTitle: 'Back',
      title: "Deck"
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerBackTitle: 'Back',
      title: "Add Card",
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerBackTitle: 'Back',
      title: "Quiz",
    }
  }
});

class App extends Component {
  componentDidMount(){
      setLocalNotification()
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <MobileFlashCardStatusBar backgroundColor={'#fff'} barStyle='light-content' />
          <MainNavigator />
        </View>
    );
  }
}

export default App;
