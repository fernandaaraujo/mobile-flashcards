import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { QuizView } from './QuizView';
import { Result } from './Result';

class DeckQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: 0,
      answers: {}
    };
  }

  moveToNextQuestionOrExit = () => {
    const totalQuestions = this.props.navigation.state.params.deck.questions.length;
    this.setState({ questionID: this.state.questionID + 1 });

    if (this.state.questionID >= (totalQuestions - 1)) {
      clearLocalNotifications().then(setLocalNotification)
    }
  }

  correctAnswer = (correct) => {
    this.setState(state => ({
      answers: {
        ...state.answers,
        [state.questionID]: correct
      }
    }))
    this.moveToNextQuestionOrExit();
  }

  render() {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    const { questionID, answers } = this.state;

    return (
      <View style={styles.container}>
        { questionID < deck.questions.length ?
          <QuizView
            actualQuestion={deck.questions[questionID]}
            questionID={questionID}
            totalQuestions={deck.questions.length}
            correctAnswer={this.correctAnswer}
          /> :
          <Result
            answers={answers}
            restart={() => this.setState({ questionID: 0, answers: {} })}
            back={() => navigation.goBack()}
          />
        }
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20
  }
});

export default DeckQuiz;
