import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, Stack, VStack} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import useRegExPhone from '~/hooks/useRegExPhone';
import {PetInfoForm, SetPetInfoForm, SignupForm} from '~/../types/signup';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import ChoiceButton from '~/components/signup/petInfo/ChoiceButton';
import _ from 'lodash';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 * 회원 가입 > 휴대폰 인증 페이지
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PetGenderRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const onMovePage = async () => {
    onChangeStage();
    navigate('AddressRegister');
  };

  console.log('@@@ form');
  console.log(form);
  console.log(!_.isNil(form.sex));

  // useEffect(() => {
  //   if (signupForm.mobile) setPhoneNumber(signupForm.mobile);
  // }, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={6}
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
