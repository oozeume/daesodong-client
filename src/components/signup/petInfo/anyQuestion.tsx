import {Stack, Text, TextArea} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 고민되는 점
 */

function AnyQuestion({handlePage}: Props) {
  return (
    <LayoutContainer>
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

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default AnyQuestion;
