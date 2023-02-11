import {StyleProp, TextStyle, ViewStyle} from 'react-native';

// 이메일 로그인 폼
export interface EmailLoginForm {
  email: string;
  password: string;
}

export interface LoginButtonProps {
  handlePress: () => void;
}

// 소셜 로그인 및 RedActiveLargeButton 컴포넌트 공통 props
export interface ActiveButtonProps extends LoginButtonProps {
  active?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
}
