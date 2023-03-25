import {Box, Center, HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {GenderType} from '~/../types/common';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  gender: GenderType;
  onChangeGender: (gender: GenderType) => void;
  isPetGenderChange?: boolean;
}

/**
 *@description 내 계정 - 내 정보 - 성별 변경 컴포넌트
 */

function GenderChange({onChangeGender, gender, isPetGenderChange}: Props) {
  return (
    <Stack pt={'28px'} flex={1} alignItems={'center'}>
      <Text fontSize={'18px'} pb={'28px'}>
        성별
      </Text>
      <Stack width={APP_WIDTH - 18 * 2} space={'28px'}>
        <Pressable onPress={() => onChangeGender('Female')}>
          <HStack alignItems={'center'}>
            <Center
              width="22px"
              height="22px"
              marginRight="10px"
              backgroundColor={
                gender === 'Female' ? colors.fussOrange[0] : 'white'
              }
              borderWidth={gender === 'Female' ? 0 : 2}
              borderColor={
                gender === 'Female' ? undefined : colors.grayScale[30]
              }
              borderRadius={100}>
              <Box
                width="9px"
                height="9px"
                borderRadius={100}
                backgroundColor={'white'}
              />
            </Center>
            <Text
              bgColor={colors.fussOrange[0]}
              fontSize={'16px'}
              color={true ? colors.grayScale[80] : colors.grayScale[60]}>
              {isPetGenderChange ? '여아' : '여성'}
            </Text>
          </HStack>
        </Pressable>

        <Pressable onPress={() => onChangeGender('Male')}>
          <HStack alignItems={'center'}>
            <Center
              width="22px"
              height="22px"
              marginRight="10px"
              backgroundColor={
                gender === 'Male' ? colors.fussOrange[0] : 'white'
              }
              borderWidth={gender === 'Male' ? 0 : 2}
              borderColor={gender === 'Male' ? undefined : colors.grayScale[30]}
              borderRadius={100}>
              <Box
                width="9px"
                height="9px"
                borderRadius={100}
                backgroundColor={'white'}
              />
            </Center>
            <Text
              bgColor={colors.fussOrange[0]}
              fontSize={'16px'}
              color={true ? colors.grayScale[80] : colors.grayScale[60]}>
              {isPetGenderChange ? '남아' : '남성'}
            </Text>
          </HStack>
        </Pressable>
      </Stack>
    </Stack>
  );
}

export default GenderChange;
