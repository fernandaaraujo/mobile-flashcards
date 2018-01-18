import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export const QuizView = ({ actualQuestion, totalQuestions, questionID, correctAnswer }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.questionCounter}>
          {questionID + 1}/{totalQuestions}
        </Text>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>
            Question:
          </Text>
          <Text style={styles.text}>
            {actualQuestion.question}
          </Text>
          <Text style={styles.title}>
            Answer:
          </Text>
          <Text style={styles.text}>
            {actualQuestion.answer}
          </Text>
        </View>
        <View style={styles.answerButton}>
          <Icon
            iconStyle={{ fontSize: 50 }}
            name='thumbs-o-up'
            type='font-awesome'
            onPress={() => correctAnswer(true)}
          />
          <Icon
            iconStyle={{ fontSize: 50 }}
            name='thumbs-o-down'
            type='font-awesome'
            onPress={() => correctAnswer(false)}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  questionCounter: {
    fontSize: 20
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30
  },
  answerButton: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 30,
    marginBottom: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 30
  }
});

export default QuizView;
