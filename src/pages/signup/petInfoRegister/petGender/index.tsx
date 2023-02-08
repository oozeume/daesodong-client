import React from 'react';
import {Stack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import ChoiceButton from '~/components/signup/petInfo/ChoiceButton';
import _ from 'lodash';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';
import {PetInfoRegisterProps} from '~/../types/signup';

/**
 *@description 집사정보등록 - 펫 성별 등록
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetGenderRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: PetInfoRegisterProps) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const onMovePage = async () => {
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetGenderRegister']);

    await setData(storageKeys.petInfoRegister.form, form);
    await setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('AddressRegister');
  };

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={currentStage}
      possibleButtonPress={!_.isNil(form.sex)}>
      <Stack w="100%" space={'10px'}>
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

export default PetGenderRegister;
