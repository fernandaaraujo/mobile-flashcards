import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export const Result = ({ answers, back, restart }) => {
  const totalQuestions = Object.keys(answers).length;
  const correctNumber = Object.keys(answers).filter(index => answers[index] === true).length;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Finished! You score was:
        </Text>
        <Text style={styles.result}>
          { Math.round(100 * (correctNumber / totalQuestions)) }%
        </Text>
      </View>
      <Button title='Restart' onPress={restart} />
      <Button title='Back to the deck' onPress={back} />
    </View>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  resultText: {
    textAlign: 'center',
    fontSize: 30
  },
  result: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10
  }
});
