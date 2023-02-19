import {Stack} from 'native-base';
import React from 'react';
import LayoutContainer from './LayoutContainer';
import ChoiceButton from './ChoiceButton';
import _ from 'lodash';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';

interface Props {
  handlePage: () => void;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 집사 성별
 */

function ChoiceGender({handlePage, form, setForm}: Props) {
  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(form.gender)}>
      <Stack w="100%" space={'10px'}>
        <ChoiceButton
          buttonName={'여성'}
          onPress={() => setForm(prev => ({...prev, gender: 'Female'}))}
          active={form.gender === 'Female'}
        />

        <ChoiceButton
          buttonName={'남성'}
          onPress={() => setForm(prev => ({...prev, gender: 'Male'}))}
          active={form.gender === 'Male'}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default ChoiceGender;
