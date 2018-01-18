import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export const Input = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={props.inputValue}
      onChangeText={(text) => props.onChangeText(text)}
      placeholder={props.placeholder}
      multiLine={true}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 25,
    marginTop: 25
  },
  input: {
    fontSize: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
})
