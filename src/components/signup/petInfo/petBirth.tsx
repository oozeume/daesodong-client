import _ from 'lodash';
import {HStack, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 태어난 년도
 */

function PetBirth({handlePage}: Props) {
  const [petBirth, setPetBirth] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Stack>
        <LayoutContainer>
          <HStack
            justifyContent={'space-between'}
            paddingTop={15}
            paddingBottom={15}
            borderBottomColor={colors.grayScale[30]}
            borderBottomWidth={1}>
            <TextInput
              onChangeText={setPetBirth}
              value={petBirth}
              onSubmitEditing={Keyboard.dismiss}
              keyboardType={'number-pad'}
              placeholder={'숫자만 입력해주세요'}
            />
            <Text fontSize={'15px'} color={colors.grayScale[70]}>
              개월
            </Text>
          </HStack>
          <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
            <Button
              handlePress={handlePage}
              large
              shadow
              text={'다음'}
              active={!_.isEmpty(petBirth)}
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
      </Stack>
    </TouchableWithoutFeedback>
  );
}

export default PetBirth;
