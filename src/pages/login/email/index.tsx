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
import {Keyboard, Platform} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {NavigationHookProp} from '~/../types/navigator';
import {ErrorResponseTransform} from '~/../types/api/common';
import {setSecurityData} from '~/utils/storage';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EmailLoginForm} from '~/../types/login';
import {usePostAuthEmailLogin} from '~/api/auth/mutations';
import {useGetUser} from '~/api/user/queries';
import {useUserRegister} from '~/store/useUserContext';
import {config} from '~/utils/config';
import {EMAIL_REGREX, PASSWORD_REGREX} from '~/constants/regEx';
import _ from 'lodash';
import useSocialLoginHandler from '~/hooks/useSocialLoginHandler';

/**
 *@description 이메일로 로그인 페이지
 */
function EmailLogin() {
  const {navigate, reset} = useNavigation<NavigationHookProp>();
  const postAuthEmailLogin = usePostAuthEmailLogin();
  const {data: userData, refetch: getUserRefetch} = useGetUser();

  const {onGoogleLogin, onKakaoLogin, onAppleLoginAndroid, onAppleLoginIOS} =
    useSocialLoginHandler();

  const setUserInfo = useUserRegister();

  const initForm = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState<EmailLoginForm>(initForm);
  const [errorForm, setErrorForm] = useState<EmailLoginForm>(initForm);

  const isLoginButtonActive =
    !_.isEmpty(loginForm.email) && !_.isEmpty(loginForm.password);

  const onLogin = async () => {
    if (!loginForm.email || !EMAIL_REGREX.test(loginForm.email))
      return setErrorForm(prev => ({
        email: '이메일을 양식을 확인해주세요.',
        password: '',
      }));
    else if (!loginForm.password || !PASSWORD_REGREX.test(loginForm.password))
      return setErrorForm(prev => ({
        email: '',
        password: '비밀번호를 확인해주세요.',
      }));

    if (postAuthEmailLogin.isLoading) return;

    const response = await postAuthEmailLogin.mutateAsync(loginForm, {
      onError: error => {
        const data = error as unknown as ErrorResponseTransform;

        if (data.message === '존재하지 않는 이메일입니다')
          setErrorForm(prev => ({email: data.message, password: ''}));
        else if (data.message === '비밀번호를 확인해주세요')
          setErrorForm(prev => ({email: '', password: data.message}));
      },
    });

    if (response?.success === 'SUCCESS') {
      await setSecurityData(config.ACCESS_TOKEN_NAME, response.data.access);
      await setSecurityData(config.REFRESH_TOKEN_NAME, response.data.refresh);

      const _userData = await getUserRefetch();

      if (_userData.data?.petInfoList.length === 0) {
        // 집사 정보가 없으면 등록 페이지로 이동
        navigate('SignupPetInfoNavigator');
      } else {
        // 있으면 시설 지도 페이지로 이동
        setUserInfo({
          userId: _userData.data?.id ?? '',
          petSpecieName: _userData.data?.mainPetInfo.specieName ?? '',
        });
        reset({index: 0, routes: [{name: 'tab'}]});
      }

      // 집사 정보 등록 테스트 시, 아래 주석을 해제하고 tab reset관련해서 주석을 해주세요.
      // reset({index: 0, routes: [{name: 'tab'}]});
      // reset({index: 0, routes: [{name: 'SignupPetInfoNavigator'}]});
    }
  };

  const onMovePasswordResetPage = () => {
    setLoginForm(prev => ({...prev, password: ''}));
    setErrorForm(initForm);
    navigate('PasswordReset', {type: 'LOGIN_EMAIL'});
  };

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: colors.grayScale['0']}}>
        <VStack bg={colors.grayScale['0']} w="100%" h="100%">
          <VStack
            flex={1}
            justifyContent={'space-between'}
            px="18px"
            mb="40px"
            pt="24px">
            <VStack>
              <VerificationForm
                placeholder={'이메일'}
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
                active={isLoginButtonActive}
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
                  onPress={onMovePasswordResetPage}
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

              <KakaoLoginButton handlePress={onKakaoLogin} />
              <AppleLoginButton
                handlePress={
                  Platform.OS === 'android'
                    ? onAppleLoginAndroid
                    : onAppleLoginIOS
                }
              />
              <GoogleLoginButton handlePress={onGoogleLogin} />
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default EmailLogin;
