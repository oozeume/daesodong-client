import _ from 'lodash';
import React from 'react';
import {TextInput, StyleSheet, Keyboard} from 'react-native';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */

function PetName({handlePage, form, setForm}: Props) {
  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <LayoutContainer
        buttonPress={handlePage}
        possibleButtonPress={!_.isEmpty(form.name)}>
        <TextInput
          style={styles.input}
          onChangeText={name => setForm(prev => ({...prev, name}))}
          value={form.name}
          placeholder={'이름을 입력해주세요'}
        />
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
