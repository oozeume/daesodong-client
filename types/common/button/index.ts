import {ColorType} from 'native-base/lib/typescript/components/types';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface ButtonBarProps {
  onPress: () => void;
  nameStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  name: string;
  backgroundColor?: ColorType;
}
