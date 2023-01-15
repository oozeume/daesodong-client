import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import _ from 'lodash';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {APP_HEIGHT} from '~/utils/dimension';
import {HEADER_HEIGHT} from '~/constants/heights';
import {Box, Center, VStack} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {
  EMAIL_SIGNUP_STAGE_TEXT_LIST,
  INIT_SIGNUP_FORM,
} from '~/constants/signup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp, RouteHookProp} from '~/../types/navigator';
import {
  INCLUDE_ENGLISH_REGREX,
  INCLUDE_NUMBER_REGREX,
  RANGE_TEXT_8_20_REGREX,
} from '~/constants/regEx';
import {VerificationResult} from '~/../types/verification';

interface Props {
  onChangeStage: () => void;
}

/**
 * 휴대폰 인증 스테이지 컴포넌트
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PasswordRegister({onChangeStage}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [signupForm, setSignupForm] = useState(INIT_SIGNUP_FORM);
  const {params} = useRoute<RouteHookProp<'PasswordRegister'>>();

  const pageHeight = APP_HEIGHT - HEADER_HEIGHT;

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
    setSignupForm(prevState => ({...prevState, password: text}));
  };

  const helpList = ['영문 포함', '숫자 포함', '8-20자 이내'];

  const handlePasswordConfirmChange = (text: string) => {
    setPasswordConfirm(text);
  };

  const isButtonActive =
    !_.isEmpty(signupForm.password) &&
    !_.isEmpty(passwordConfirm) &&
    signupForm.password === passwordConfirm;

  const onMovePage = async () => {
    onChangeStage();
    navigate('NicknameRegister', signupForm);
  };

  useEffect(() => {
    if (params) {
      setSignupForm(params);
    }
  }, []);

  console.log('@@@ signupForm');
  console.log(signupForm);

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 60}>
        <Box>
          <VStack
            bgColor={colors.grayScale[0]}
            justifyContent="space-between"
            h={pageHeight}>
            <Center mt={'60px'} px="18px">
              <StageTextBox
                totalStage={4}
                currentStage={3}
                stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST[2]}
              />

              <VerificationForm
                placeholder={'비밀번호 입력'}
                value={signupForm.password}
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
                  signupForm.password.length > 0
                    ? signupForm.password === passwordConfirm
                      ? 'SUCCESS'
                      : 'FAIL'
                    : undefined
                }
                secureTextEntry
              />
            </Center>

            <VStack px="18px" mb={'56px'}>
              <RedActiveLargeButton
                active={isButtonActive}
                text={'다음'}
                handlePress={onMovePage}
              />
            </VStack>
          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutView>
  );
}

export default PasswordRegister;
