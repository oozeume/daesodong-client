import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';

interface LoginButtonProps {
  handlePress: () => void;
}

/**
 *@description 카카오 로그인 버튼
 */
function KakaoLoginButton({handlePress}: LoginButtonProps) {
  return (
    <Button
      text="카카오 로그인"
      handlePress={handlePress}
      buttonColors={{active: '#FEEB00'}}
      fontColors={{active: colors.grayScale['90']}}
      borderColors={{active: '#ffffffff'}}
      active
      large
      textStyle={{fontSize: 16}}
    />
  );
}

/**
 *@description 애플 로그인 버튼
 */
function AppleLoginButton({handlePress}: LoginButtonProps) {
  return (
    <Button
      text="Apple 로그인"
      handlePress={handlePress}
      buttonColors={{active: colors.grayScale['90']}}
      fontColors={{active: colors.grayScale['0']}}
      borderColors={{active: '#ffffffff'}}
      active
      large
      buttonStyle={{marginTop: 10}}
      textStyle={{fontSize: 16}}
    />
  );
}

/**
 *@description 구글 로그인 버튼
 */
function GoogleLoginButton({handlePress}: LoginButtonProps) {
  return (
    <Button
      text="구글로 로그인"
      handlePress={handlePress}
      buttonColors={{active: colors.grayScale['0']}}
      fontColors={{active: colors.grayScale['90']}}
      borderColors={{active: colors.grayScale['90']}}
      active
      large
      buttonStyle={{marginTop: 10}}
      textStyle={{fontSize: 16}}
    />
  );
}

/**
 *@description 이메일 로그인 버튼
 */
function EmailLoginButton({handlePress}: LoginButtonProps) {
  return (
    <Button
      text="이메일로 로그인"
      handlePress={handlePress}
      buttonColors={{active: colors.grayScale['30']}}
      fontColors={{active: colors.grayScale['90']}}
      borderColors={{active: colors.grayScale['90']}}
      active
      large
      buttonStyle={{marginTop: 10}}
      textStyle={{fontSize: 16}}
    />
  );
}

interface ActiveButtonProps extends LoginButtonProps {
  active: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
}

/**
 *@description 활성화/비활성화 빨간색 큰 버튼 (ex. 확인, 가입완료 버튼)
 */
function RedActiveLargeButton({
  handlePress,
  active,
  buttonStyle,
  textStyle,
  text,
}: ActiveButtonProps) {
  return (
    <Button
      text={text}
      handlePress={handlePress}
      buttonColors={{
        active: colors.fussOrange['0'],
        disabled: colors.fussOrange['-30'],
      }}
      fontColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['50'],
      }}
      borderColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['50'],
      }}
      active={active}
      large
      buttonStyle={buttonStyle}
      textStyle={[{fontSize: 14}, textStyle]}
    />
  );
}

/**
 *@description 활성화/비활성화 노란색 작은 버튼 (ex. 폰 인증하기 버튼)
 */
function YellowActiveSmallButton({
  handlePress,
  active,
  buttonStyle,
  textStyle,
  text,
}: ActiveButtonProps) {
  return (
    <Button
      text={text}
      handlePress={handlePress}
      buttonColors={{
        active: colors.fussYellow['0'],
        disabled: colors.fussYellow['-30'],
      }}
      fontColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['40'],
      }}
      borderColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['40'],
      }}
      active={active}
      large={false}
      buttonStyle={buttonStyle}
      textStyle={[{fontSize: 16}, textStyle]}
    />
  );
}

export {
  KakaoLoginButton,
  AppleLoginButton,
  GoogleLoginButton,
  EmailLoginButton,
  RedActiveLargeButton,
  YellowActiveSmallButton,
};
