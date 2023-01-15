import {useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import {Box, Center, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {SignupForm} from '~/../types/login';
import {NavigationHookProp, RouteHookProp} from '~/../types/navigator';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import StageTextBox from '~/components/common/stage/StageTextBox';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import VerificationForm from '~/components/common/VerificationForm';
import {HEADER_HEIGHT, STAGE_BAR_HEIGHT} from '~/constants/heights';
import {
  EMAIL_SIGNUP_STAGE_TEXT_LIST,
  INIT_SIGNUP_FORM,
} from '~/constants/signup';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';

interface Props {
  onChangeStage: () => void;
}

/**
 *@description 아이디(이메일) 입력
 */

function EmailRegister({onChangeStage}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {params} = useRoute<RouteHookProp<'EmailRegister'>>();

  const [signupForm, setSignupForm] = useState(INIT_SIGNUP_FORM);
  const pageHeight = APP_HEIGHT - HEADER_HEIGHT - STAGE_BAR_HEIGHT;
  console.log('@@@ signupForm');
  console.log(signupForm);

  const onEmailChange = (text: string) => {
    setSignupForm(prev => ({...prev, email: text}));
  };

  const onMovePage = async () => {
    onChangeStage();
    navigate('PasswordRegister', signupForm);
  };

  useEffect(() => {
    if (params) {
      const _signupForm = params as SignupForm;
      setSignupForm(_signupForm);
    }
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
                value={signupForm.email}
                onChangeText={onEmailChange}
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
                // active={signupForm.mobile.length > 10}
                active
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
