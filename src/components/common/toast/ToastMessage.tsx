import {Center, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

const PADDING_X = 18;

interface Props {
  text: string;
  leftElement?: JSX.Element;
}

/**
 *@description 토스트 팝업 기본 메세지
 *@param text - (필수)
 */

function ToastMessage({text, leftElement}: Props) {
  return (
    <Center
      minHeight={'44px'}
      px={leftElement ? '14px' : 0}
      py="12px"
      w={APP_WIDTH - PADDING_X * 2}
      flexDirection={'row'}
      justifyContent={leftElement ? 'space-between' : 'center'}
      borderRadius={'8px'}
      backgroundColor={'rgba(26, 30, 39, 0.8)'}>
      <Text textAlign={'center'} color={colors.grayScale[0]}>
        {text}
      </Text>

      {leftElement}
    </Center>
  );
}

export default ToastMessage;
