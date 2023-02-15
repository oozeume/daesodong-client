import React from 'react';
import {Stack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {PetInfoRegisterProps} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import ChoiceButton from '~/components/signup/petInfo/ChoiceButton';
import _ from 'lodash';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';

/**
 *@description 집사정보등록 - 집사 성 등록 페이지
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function ChoiceGenderRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: PetInfoRegisterProps) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const onMovePage = () => {
    onChangeStage();
    setPreviousURL(prev => [...prev, 'ChoiceGenderRegister']);

    setData(storageKeys.petInfoRegister.form, form);
    setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('PetOwnerBirthRegister');
  };

  return (
    <LayoutContainer
      currentStage={currentStage}
      buttonPress={onMovePage}
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

export default ChoiceGenderRegister;
