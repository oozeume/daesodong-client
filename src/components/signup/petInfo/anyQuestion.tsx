import {Stack, Text, TextArea} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 고민되는 점
 */

function AnyQuestion({handlePage}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <Stack>
        <TextArea
          _focus={{
            backgroundColor: 'transparent',
            borderColor: colors.grayScale[30],
          }}
          borderRadius={'8px'}
          width={'100%'}
          h={240}
          placeholderTextColor={colors.grayScale[40]}
          autoCompleteType={''}
          fontSize={'15px'}
          lineHeight={'22px'}
          color={colors.grayScale[80]}
          placeholder={
            '걱정되는 점을 알려주시면 도움이 될만한 콘텐츠와 시설 정보를 알려드릴 수 있어요'
          }
        />
      </Stack>

      <Stack position={'absolute'} bottom={120} alignSelf={'center'}>
        <Text color={colors.grayScale[60]}>건너뛰기</Text>
      </Stack>
    </LayoutContainer>
  );
}

export default AnyQuestion;
