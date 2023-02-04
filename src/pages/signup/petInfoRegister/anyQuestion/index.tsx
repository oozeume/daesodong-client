import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, HStack, Stack, Text, TextArea, VStack} from 'native-base';
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
function AnyQuestionRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const [concern, setConcern] = useState<string>();

  console.log(concern);
  const onMovePage = () => {
    if (!concern) return;

    setForm(pre => ({...pre, concern}));
    onChangeStage();
    navigate('PetImageRegister');
  };

  const onSkipPage = () => {
    onChangeStage();
    navigate('PetImageRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={8}
      possibleButtonPress={!_.isNil(concern)}>
      <TextArea
        _focus={{
          backgroundColor: 'transparent',
          borderColor: colors.grayScale[30],
        }}
        borderRadius={'8px'}
        width={'100%'}
        h={240}
        value={concern}
        onChangeText={text => setConcern(text)}
        placeholderTextColor={colors.grayScale[40]}
        autoCompleteType={''}
        fontSize={'15px'}
        lineHeight={'22px'}
        color={colors.grayScale[80]}
        keyboardType={'default'}
        placeholder={'염려되는 질환이나 궁금했던 점을 알려주세요'}
      />

      <Stack position={'absolute'} bottom={120} alignSelf={'center'}>
        <Text onPress={onSkipPage} color={colors.grayScale[60]}>
          건너뛰기
        </Text>
      </Stack>
    </LayoutContainer>
  );
}

export default AnyQuestionRegister;
