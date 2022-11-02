import React from 'react';
import {ButtonBar} from '~/components/common/button';

interface LoginButtonProps {
  onPress: () => void;
}

function KakaoLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      text="카카오 로그인"
      onPress={onPress}
      backgroundColor="#FEEB00"
    />
  );
}

function AppleLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      text="Apple 로그인"
      onPress={onPress}
      backgroundColor="#1A1E27"
      buttonStyle={{marginTop: 10}}
      textStyle={{color: '#ffffff'}}
    />
  );
}

function GoogleLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      text="구글로 로그인"
      onPress={onPress}
      buttonStyle={{marginTop: 10, borderWidth: 1, borderColor: '#1A1E27'}}
    />
  );
}

function EmailLoginButton({onPress}: LoginButtonProps) {
  return (
    <ButtonBar
      text="이메일로 로그인"
      onPress={onPress}
      backgroundColor="#E1E2E4"
      buttonStyle={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#1A1E27',
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
