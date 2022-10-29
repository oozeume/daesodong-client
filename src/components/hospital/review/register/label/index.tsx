import {Text} from 'native-base';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
}
function Label({text, style}: Props) {
  return (
    <Text fontSize="13px" color="#5D626D" style={style}>
      {text}
    </Text>
  );
}

export default Label;
