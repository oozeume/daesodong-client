import _ from 'lodash';
import {Stack} from 'native-base';
import React, {useState} from 'react';
import {TextInput, StyleSheet, Keyboard} from 'react-native';
import Button from '~/components/common/button';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */

function PetName({handlePage}: Props) {
  const [petName, setPetName] = useState('');
  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <LayoutContainer>
        <TextInput
          style={styles.input}
          onChangeText={setPetName}
          value={petName}
          placeholder={'이름을 입력해주세요'}
        />
        <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
          <Button
            handlePress={handlePage}
            large
            shadow
            active
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
    </TouchableWithoutView>
  );
}

export default PetName;

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});
