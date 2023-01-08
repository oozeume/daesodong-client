import {Button, Center, Divider, HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {colors} from '~/theme/theme';

interface Props {
  onPress: () => void;
  onClose: () => void;
  isInvisibleDuplicationButton?: boolean;
  title?: string;
  value?: string;
  valueUnit?: JSX.Element;
  subText?: JSX.Element;
}

/**
 *@description 내 계정 - 내 정보/아이 정보 - 이름 변경 컴포넌트
 */

function NameChange({
  onPress,
  onClose,
  isInvisibleDuplicationButton,
  title,
  value,
  valueUnit,
  subText,
}: Props) {
  const [newName, setNewname] = useState(value);
  return (
    <>
      <Center flex={1} px={'18px'} pt={'28px'}>
        <Text
          fontSize={'18px'}
          fontWeight={'500'}
          pb={'16px'}
          color={colors.grayScale[80]}>
          {title ?? '닉네임'}
        </Text>
        {subText}
      </Center>

      <HStack
        mt={'24px'}
        height={'60px'}
        width="100%"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TextInput onChangeText={setNewname} value={newName} />

        {valueUnit}

        {!isInvisibleDuplicationButton && (
          <Button
            backgroundColor={colors.fussYellow[0]}
            borderColor={colors.grayScale[90]}
            borderWidth={1}
            height={'36px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text fontWeight={'500'} fontSize={'14px'} lineHeight={'14px'}>
              중복확인
            </Text>
          </Button>
        )}
      </HStack>

      <Divider mb={'24px'} />

      <HStack flex={1} space={'10px'}>
        <Button
          onPress={onClose}
          width={'80px'}
          height={'52px'}
          borderColor={colors.grayScale[60]}
          borderWidth={1}
          backgroundColor={colors.grayScale[10]}>
          <Text fontSize={'16px'} fontWeight={'500'}>
            이전
          </Text>
        </Button>
        <Button
          onPress={onPress}
          flex={1}
          height={'52px'}
          borderColor={colors.grayScale[60]}
          borderWidth={1}
          backgroundColor={colors.fussOrange['0']}>
          <Text
            fontSize={'16px'}
            fontWeight={'500'}
            color={colors.grayScale[80]}>
            변경
          </Text>
        </Button>
      </HStack>
    </>
  );
}

export default NameChange;
