import {HStack, Text, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {
  AppleLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '~/components/login/button';
import EmailLoginHelperButton from '~/components/login/email/button';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import {Keyboard} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {NavigationHookProp} from '~/../types/navigator';
import {ErrorResponseTransform} from '~/../types/api/common';
import {usePostAuthEmailLogin} from '~/api/auth';
import {getSecurityData, setSecurityData} from '~/utils/storage';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

interface EmailLoginForm {
  email: string;
  password: string;
}

/**
 *@description 이메일로 로그인 페이지
 */
function EmailLogin() {
  const {navigate, reset} = useNavigation<NavigationHookProp>();

  const postAuthEmailLogin = usePostAuthEmailLogin();

  const initForm = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState<EmailLoginForm>(initForm);

  const [errorForm, setErrorForm] = useState<EmailLoginForm>(initForm);

  useEffect(() => {
    async function checkIsLogin() {
      const accessToken = await getSecurityData('access_token');

      if (accessToken) reset({index: 0, routes: [{name: 'tab'}]});
    }

    // 로그인 가능 여부 체크
    if (!__DEV__) checkIsLogin();
  }, []);

  const onLogin = async () => {
    // 테스트 혹은 토큰 발급 로그인을 위한 로그인 시, 아랫줄을 주석 처리해주세요.
    // if (__DEV__) return reset({index: 0, routes: [{name: 'tab'}]});

    if (!loginForm.email) return;
    if (!loginForm.password) return;

    const response = await postAuthEmailLogin.mutateAsync(loginForm, {
      onError: error => {
        const data = error as unknown as ErrorResponseTransform;

        if (data.message === '존재하지 않는 이메일입니다')
          setErrorForm(prev => ({...prev, email: data.message}));
        else if (data.message === '비밀번호가 틀렸습니다')
          setErrorForm(prev => ({...prev, password: data.message}));
      },
    });

    if (response?.success === 'SUCCESS') {
      await setSecurityData('access_token', response.data.access);
      await setSecurityData('refresh_token', response.data.refresh);

      // 집사 정보 등록 테스트 시, 아래 주석을 해제하고 tab reset관련해서 주석을 해주세요.
      reset({index: 0, routes: [{name: 'tab'}]});
      // reset({index: 0, routes: [{name: 'PetInfoRegister'}]});
    }
  };

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <VStack bg={colors.grayScale['0']} w="100%" h="100%">
          <VStack flex={1} justifyContent={'space-between'} px="18px" mb="40px">
            <VStack>
              <VerificationForm
                placeholder={'아이디(이메일)'}
                marginBottom={'12px'}
                errorMessage={errorForm.email}
                verificationResult={
                  errorForm?.email.length !== 0 ? 'FAIL' : undefined
                }
                onChangeText={text =>
                  setLoginForm(prev => ({...prev, email: text}))
                }
                value={loginForm.email}
                keyboardType="email-address"
                autoFocus
              />

              <VerificationForm
                placeholder={'비밀번호'}
                marginBottom={'36px'}
                errorMessage="비밀번호를 확인해주세요"
                verificationResult={
                  errorForm?.password.length !== 0 ? 'FAIL' : undefined
                }
                onChangeText={text =>
                  setLoginForm(prev => ({...prev, password: text}))
                }
                value={loginForm.password}
                secureTextEntry
              />

              <RedActiveLargeButton
                active={true}
                handlePress={onLogin}
                buttonStyle={{marginBottom: 20}}
                text={'로그인'}
              />

              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <EmailLoginHelperButton
                  onPress={() => navigate('FindEmail')}
                  name="이메일 찾기"
                />

                <View w="1px" h="10px" bg={colors.grayScale['40']} />

                <EmailLoginHelperButton
                  onPress={() => navigate('PasswordReset')}
                  name="비밀번호 재설정"
                />

                <View w="1px" h="10px" bg={colors.grayScale['40']} />

                <EmailLoginHelperButton
                  onPress={() => navigate('SignUpEmailNavigator')}
                  name="회원가입"
                />
              </HStack>
            </VStack>

            <VStack>
              <HStack mb="32px" alignItems="center">
                <View flex={1} h="1px" bg={colors.grayScale['20']} />

                <Text
                  color={colors.grayScale['40']}
                  fontSize={'14px'}
                  px="13px">
                  간편 로그인
                </Text>

                <View flex={1} h="1px" bg={colors.grayScale['20']} />
              </HStack>

              <KakaoLoginButton handlePress={() => {}} />
              <AppleLoginButton handlePress={() => {}} />
              <GoogleLoginButton handlePress={() => {}} />
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default EmailLogin;
