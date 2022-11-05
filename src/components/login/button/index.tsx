import React from 'react';
import ButtonBar from '~/components/common/ButtonBar';
import {colors} from '~/theme/theme';

interface LoginButtonProps {
  onPress: () => void;
}

/**
 *@description 카카오 로그인 버튼 ui
 */
function KakaoLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      name="카카오 로그인"
      onPress={onPress}
      backgroundColor="#FEEB00"
    />
  );
}

/**
 *@description 애플 로그인 버튼 ui
 */
function AppleLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      name="Apple 로그인"
      onPress={onPress}
      backgroundColor={colors.grayScale['90']}
      buttonStyle={{marginTop: 10}}
      nameStyle={{color: '#fff'}}
    />
  );
}

/**
 *@description 구글 로그인 버튼 ui
 */
function GoogleLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      name="구글로 로그인"
      onPress={onPress}
      buttonStyle={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.grayScale['90'],
      }}
    />
  );
}

/**
 *@description 이메일 로그인 버튼 ui
 */
function EmailLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      name="이메일로 로그인"
      onPress={onPress}
      backgroundColor="#E1E2E4"
      buttonStyle={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.grayScale['90'],
      }}
    />
  );
}

export {
  ButtonBar,
  KakaoLoginButton,
  AppleLoginButton,
  GoogleLoginButton,
  EmailLoginButton,
};
