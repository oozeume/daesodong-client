import {Avatar, HStack, Stack, Text} from 'native-base';
import React from 'react';
import PetInfoOneLine from '~/components/common/PetInfoOneLine';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 고마워요 누른 유저정보
 */
function PetInfo() {
  return (
    <HStack
      flex={1}
      py={'14px'}
      px={'18px'}
      justifyContent={'space-between'}
      borderBottomWidth={1}
      borderBottomColor={colors.grayScale[10]}
      alignItems={'center'}>
      <Stack space={'2px'}>
        <Text color={colors.grayScale[80]} fontSize={'14px'} fontWeight={'500'}>
          닉네임과 동물이름
        </Text>

        <PetInfoOneLine
          color={colors.grayScale[60]}
          petType={'골든햄스터'}
          petAge={'2개월'}
          petGender={'남아'}
          dividerColor={colors.grayScale[30]}
        />
      </Stack>

      <Avatar width={'32px'} height={'32px'} />
    </HStack>
  );
}

export default PetInfo;
