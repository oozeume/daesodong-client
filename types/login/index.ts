import {INIT_SIGNUP_FORM} from '~/constants/signup';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

type initSignupForm = typeof INIT_SIGNUP_FORM;

// 이메일 회원가입 폼 초기값 타입
export interface SignupForm extends initSignupForm {}

export interface LoginButtonProps {
  handlePress: () => void;
}

// 소셜 로그인 및 RedActiveLargeButton 컴포넌트 공통 props
export interface ActiveButtonProps extends LoginButtonProps {
  active: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
}
