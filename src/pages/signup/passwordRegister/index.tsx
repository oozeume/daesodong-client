import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import _ from 'lodash';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, VStack} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import {
  INCLUDE_ENGLISH_REGREX,
  INCLUDE_NUMBER_REGREX,
  RANGE_TEXT_8_20_REGREX,
} from '~/constants/regEx';
import {VerificationResult} from '~/../types/verification';
import {SignupForm} from '~/../types/signup';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<SignupNavigatorRouteList[]>
  >;
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 * 회원가입 > 비밀번호 등록 페이지
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PasswordRegister({
  onChangeStage,
  setPreviousURL,
  signupForm,
  setSignupForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]);

  const handlePasswordChange = (text: string) => {
    const isIncludeEnglish = INCLUDE_ENGLISH_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isIncludeNumber = INCLUDE_NUMBER_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isProperLength = RANGE_TEXT_8_20_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';

    setHelpResults([isIncludeEnglish, isIncludeNumber, isProperLength]);
    setPassword(text);
  };

  const helpList = ['영문 포함', '숫자 포함', '8-20자 이내'];

  const handlePasswordConfirmChange = (text: string) => {
    setPasswordConfirm(text);
  };

  const isButtonActive =
    !_.isEmpty(password) &&
    !_.isEmpty(passwordConfirm) &&
    password === passwordConfirm;

  const onMovePage = async () => {
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PasswordRegister']);
    setSignupForm(prevState => ({...prevState, password}));
    navigate('NicknameRegister');
  };

  useEffect(() => {
    setPassword('');
  }, []);

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <Box pb="40px" flex={1}>
        <VStack
          bgColor={colors.grayScale[0]}
          justifyContent="space-between"
          flex={1}>
          <Center mt={'60px'} px="18px">
            <StageTextBox
              totalStage={4}
              currentStage={3}
              stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST[2]}
            />

            <VerificationForm
              placeholder={'비밀번호 입력'}
              value={password}
              onChangeText={handlePasswordChange}
              helpList={helpList}
              marginBottom={'20px'}
              helpVerificationResults={helpResults}
              secureTextEntry
            />

            <VerificationForm
              placeholder={'비밀번호 확인'}
              value={passwordConfirm}
              onChangeText={handlePasswordConfirmChange}
              successMessage={'비밀번호가 일치합니다'}
              errorMessage={'비밀번호를 확인해주세요'}
              verificationResult={
                password.length > 0
                  ? password === passwordConfirm
                    ? 'SUCCESS'
                    : 'FAIL'
                  : undefined
              }
              secureTextEntry
            />
          </Center>

          <VStack px="18px" mb={Platform.OS === 'android' ? '56px' : '82px'}>
            <RedActiveLargeButton
              active={isButtonActive}
              text={'다음'}
              handlePress={onMovePage}
            />
          </VStack>
        </VStack>
      </Box>
    </TouchableWithoutView>
  );
}

export default PasswordRegister;
