import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, TextInput} from 'react-native';
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
import {DateList} from '~/components/signup/petInfo/PetOwnerBirth';
import dayjs from 'dayjs';
import DateSelector from '~/components/hospital/review/register/selector';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */
function PetNameRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const [name, setName] = useState<string>();

  const onMovePage = () => {
    if (!name) return;

    setForm(pre => ({...pre, name}));
    onChangeStage();
    navigate('PetTypeRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={3}
      possibleButtonPress={!_.isNil(name)}>
      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
        placeholder={'이름을 입력해주세요'}
      />
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});

export default PetNameRegister;
