import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, HStack, Stack, Text, VStack} from 'native-base';
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
function PetBirthRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const [birthDate, setBirthDate] = useState<number>();

  console.log(birthDate);
  const onMovePage = () => {
    if (!birthDate) return;

    setForm(pre => ({...pre, birthDate}));
    onChangeStage();
    navigate('PetGenderRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={5}
      possibleButtonPress={!_.isNil(birthDate)}>
      <HStack
        mx="18px"
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomColor={colors.grayScale[30]}
        borderBottomWidth={1}>
        <TextInput
          style={styles.input}
          onChangeText={text => setBirthDate(Number(text))}
          value={birthDate?.toString()}
          onSubmitEditing={Keyboard.dismiss}
          keyboardType={'number-pad'}
          placeholder={'숫자만 입력해주세요'}
          autoFocus
        />
        <Text fontSize={'15px'} color={colors.grayScale[70]}>
          개월
        </Text>
      </HStack>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 15,
  },
});

export default PetBirthRegister;
