import {HStack, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 태어난 년도
 */

function PetBirth({handlePage}: Props) {
  const [petName, setPetName] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Stack>
        <LayoutContainer buttonPress={handlePage}>
          <HStack
            justifyContent={'space-between'}
            paddingTop={15}
            paddingBottom={15}
            borderBottomColor={colors.grayScale[30]}
            borderBottomWidth={1}>
            <TextInput
              onChangeText={setPetName}
              value={petName}
              onSubmitEditing={Keyboard.dismiss}
              keyboardType={'number-pad'}
              placeholder={'숫자만 입력해주세요'}
            />
            <Text fontSize={'15px'} color={colors.grayScale[70]}>
              개월
            </Text>
          </HStack>
        </LayoutContainer>
      </Stack>
    </TouchableWithoutFeedback>
  );
}

export default PetBirth;
