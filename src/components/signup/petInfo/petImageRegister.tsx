import {Circle, HStack, Stack, Text, Pressable} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';

interface Props {
  onPress: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 이미지
 */

function PetImageRegister({onPress}: Props) {
  return (
    <LayoutContainer>
      <HStack w={'100%'} justifyContent={'center'} pt={'24px'}>
        <Circle
          w={'165px'}
          h={'165px'}
          backgroundColor={colors.grayScale[10]}
        />
      </HStack>

      <Pressable
        mt={'16px'}
        alignSelf={'center'}
        borderColor={colors.grayScale[90]}
        borderWidth={1}
        w={'73px'}
        borderRadius={'4px'}
        h={'26px'}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={colors.fussYellow[0]}>
        <Text>사진 선택</Text>
      </Pressable>

      <Stack position={'absolute'} bottom={120} alignSelf={'center'}>
        <Text color={colors.grayScale[60]}>건너뛰기</Text>
      </Stack>

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={onPress}
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

export default PetImageRegister;
