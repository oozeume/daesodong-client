import {Text} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {colors} from '~/theme/theme';

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
  color?: ColorType;
}
function Label({text, style, color}: Props) {
  return (
    <Text fontSize="13px" color={color ?? colors.grayScale['80']} style={style}>
      {text}
    </Text>
  );
}

export default Label;
