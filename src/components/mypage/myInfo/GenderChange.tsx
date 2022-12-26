import {Box, Center, HStack, Pressable, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

type GenderType = '여성' | '남성';

interface Props {
  onPress: () => void;
}

/**
 *@description 내 계정 - 내 정보 - 성별 변경 컴포넌트
 */

function GenderChange({onPress}: Props) {
  const [selectedGender, setSelectedGender] = useState<GenderType>('여성');
  return (
    <Stack pt={'28px'} flex={1} alignItems={'center'}>
      <Text fontSize={'18px'} pb={'28px'}>
        성별
      </Text>
      <Stack width={APP_WIDTH - 18 * 2} space={'28px'}>
        <Pressable
          onPress={() => {
            setSelectedGender('여성');
            onPress();
          }}>
          <HStack alignItems={'center'}>
            <Center
              width="22px"
              height="22px"
              marginRight="10px"
              backgroundColor={
                selectedGender === '여성' ? colors.fussOrange[0] : 'white'
              }
              borderWidth={selectedGender === '여성' ? 0 : 2}
              borderColor={
                selectedGender === '여성' ? undefined : colors.grayScale[30]
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
              여성
            </Text>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => {
            setSelectedGender('남성');
            onPress();
          }}>
          <HStack alignItems={'center'}>
            <Center
              width="22px"
              height="22px"
              marginRight="10px"
              backgroundColor={
                selectedGender === '남성' ? colors.fussOrange[0] : 'white'
              }
              borderWidth={selectedGender === '남성' ? 0 : 2}
              borderColor={
                selectedGender === '남성' ? undefined : colors.grayScale[30]
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
              남성
            </Text>
          </HStack>
        </Pressable>
      </Stack>
    </Stack>
  );
}

export default GenderChange;
