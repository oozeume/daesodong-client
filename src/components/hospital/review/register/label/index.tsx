import {Text} from 'native-base';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

interface props {
  text: string;
  style?: StyleProp<TextStyle>;
}
function Label({text, style}: props) {
  return <Text style={[styles.label, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#5D626D;',
  },
});

export default Label;
