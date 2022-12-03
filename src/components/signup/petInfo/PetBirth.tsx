import _ from 'lodash';
import {HStack, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';

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
        <LayoutContainer
          buttonPress={handlePage}
          possibleButtonPress={!_.isEmpty(petBirth)}>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            borderBottomColor={colors.grayScale[30]}
            borderBottomWidth={1}>
            <TextInput
              style={styles.input}
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
        </LayoutContainer>
      </Stack>
    </TouchableWithoutFeedback>
  );
}

export default PetBirth;

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});
