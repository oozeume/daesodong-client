import {Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface EmailLoginHelperButtonProps {
  onPress: () => void;
  name: string;
}

/**
 *@description 이메일 로그인 폼 바로 아래 버튼 ui (ex. 이메일 찾기, 비밀번호 재설정, 회원가입)
 *@param {string} name - 버튼 이름
 */
function EmailLoginHelperButton({onPress, name}: EmailLoginHelperButtonProps) {
  return (
    <Pressable flex={1} onPress={onPress}>
      <Text fontSize="13px" textAlign={'center'} color={colors.grayScale['60']}>
        {name}
      </Text>
    </Pressable>
  );
}

export {EmailLoginHelperButton};
