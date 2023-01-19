import _ from 'lodash';
import {Stack} from 'native-base';
import React from 'react';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import ChoiceButton from './ChoiceButton';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 성별
 */

function ChoicePetGender({handlePage, form, setForm}: Props) {
  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(form.sex)}>
      <Stack space={'10px'}>
        <ChoiceButton
          buttonName={'여아'}
          onPress={() => setForm(prev => ({...prev, sex: 'Female'}))}
          active={form.sex === 'Female'}
        />

        <ChoiceButton
          buttonName={'남아'}
          onPress={() => setForm(prev => ({...prev, sex: 'Male'}))}
          active={form.sex === 'Male'}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default ChoicePetGender;
