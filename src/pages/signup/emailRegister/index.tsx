import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Box, Center, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {
  NavigationHookProp,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import {SignupForm} from '~/../types/signup';
import {VerificationResult} from '~/../types/verification';
import {usePostAuthEmailCheck} from '~/api/auth';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import StageTextBox from '~/components/common/stage/StageTextBox';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import VerificationForm from '~/components/common/VerificationForm';
import {HEADER_HEIGHT, STAGE_BAR_HEIGHT} from '~/constants/heights';
import {EMAIL_REGREX} from '~/constants/regEx';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<SignupNavigatorRouteList[]>
  >;
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 *@description 회원가입 > 이메일 입력 페이지
 */

function EmailRegister({
  onChangeStage,
  setPreviousURL,
  signupForm,
  setSignupForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [email, setEmail] = useState('');
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult>();

  const pageHeight = APP_HEIGHT - HEADER_HEIGHT - STAGE_BAR_HEIGHT;
  const postAuthEmailCheck = usePostAuthEmailCheck();

  const onEmailChange = (text: string) => {
    setEmail(text);
  };

  const onMovePage = async () => {
    try {
      const response = await postAuthEmailCheck.mutateAsync({email});

      if (response.data) {
        onChangeStage();
        setPreviousURL(prev => [...prev, 'EmailRegister']);
        setSignupForm(prev => ({...prev, email}));
        navigate('PasswordRegister');
      } else {
        // 이메일 중복 처리
        setVerificationResult('FAIL');
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (signupForm.email) setEmail(signupForm.email);
  }, []);

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
                currentStage={2}
                stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST[1]}
              />

              <VerificationForm
                placeholder={'아이디 (이메일)'}
                value={email}
                onChangeText={onEmailChange}
                errorMessage="이미 가입된 이메일입니다"
                verificationResult={verificationResult}
              />
            </Center>

            <VStack px="18px" mb={'56px'}>
              <Box
                bgColor={colors.grayScale[10]}
                mb="20px"
                px="18px"
                py="16px"
                borderRadius={8}>
                <Text
                  color={colors.grayScale[60]}
                  fontSize={'14px'}
                  fontWeight={400}>
                  비밀번호 변경 또는 계정 인증을 위해 사용될 수 있으니 정확하게
                  입력해주세요.
                </Text>
              </Box>

              <RedActiveLargeButton
                active={EMAIL_REGREX.test(email)}
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

export default EmailRegister;
