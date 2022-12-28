import {Center, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

const PADDING_X = 18;

interface Props {
  text: string;
}

/**
 *@description 토스트 팝업 기본 메세지
 *@param text - (필수)
 */

function ToastMessage({text}: Props) {
  return (
    <Center
      height={'44px'}
      w={APP_WIDTH - PADDING_X * 2}
      justifyContent={'center'}
      borderRadius={'8px'}
      backgroundColor={'rgba(26, 30, 39, 0.8)'}>
      <Text color={colors.grayScale[0]}>{text}</Text>
    </Center>
  );
}

export default ToastMessage;
