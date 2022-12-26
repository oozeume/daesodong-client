import {Stack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  text: string;
}

/**
 *@description 토스트 팝업 기본 메세지
 *@param text - (필수)
 */

function ToastMessage({text}: Props) {
  return (
    <Stack
      alignSelf={'center'}
      height={'44px'}
      w={APP_WIDTH - 18 * 2}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={'8px'}
      backgroundColor={'rgba(26, 30, 39, 0.8)'}>
      <Text color={colors.grayScale[0]}>{text}</Text>
    </Stack>
  );
}

export default ToastMessage;
