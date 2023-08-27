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
import {
  getSecurityData,
  removeSecurityData,
  setSecurityData,
} from '~/utils/storage';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EmailLoginForm} from '~/../types/login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  usePostAuthEmailLogin,
  usePostAuthSocialLogin,
} from '~/api/auth/mutations';
import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import {useGetUser} from '~/api/user/queries';
import {useUserRegister} from '~/store/useUserContext';
import {config} from '~/utils/config';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import useToastShow from '~/hooks/useToast';
import {EMAIL_REGREX, PASSWORD_REGREX} from '~/constants/regEx';
import _ from 'lodash';

/**
 *@description 이메일로 로그인 페이지
 */
function EmailLogin() {
  const {navigate, reset} = useNavigation<NavigationHookProp>();
  const postAuthSocialLogin = usePostAuthSocialLogin();
  const postAuthEmailLogin = usePostAuthEmailLogin();
  const {data: userData, refetch: getUserRefetch} = useGetUser();
  const {toastShow} = useToastShow();

  const initForm = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState<EmailLoginForm>(initForm);
  const [errorForm, setErrorForm] = useState<EmailLoginForm>(initForm);

  useEffect(() => {
    async function checkIsLogin() {
      const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);

      if (accessToken) reset({index: 0, routes: [{name: 'tab'}]});
    }

    // 로그인 가능 여부 체크
    // if (__DEV__) checkIsLogin();
  }, []);

  const onLoginComplete = async (tokenData: {
    access: string;
    refresh: string;
  }) => {
    try {
      await setSecurityData(config.ACCESS_TOKEN_NAME, tokenData.access);
      await setSecurityData(config.REFRESH_TOKEN_NAME, tokenData.refresh);

      const _userData = await getUserRefetch();
      if (_userData.data?.petInfoList.length === 0) {
        // 집사 정보가 없으면 등록 페이지로 이동
        navigate('SignupPetInfoNavigator');
      } else {
        // 있으면 시설 지도 페이지로 이동

        reset({index: 0, routes: [{name: 'tab'}]});
      }
    } catch (error) {
      removeSecurityData(config.ACCESS_TOKEN_NAME);
      removeSecurityData(config.REFRESH_TOKEN_NAME);
    }
  };

  const setUserInfo = useUserRegister();

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

  async function onAppleLogin() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log(appleAuthRequestResponse);

        // 유저 인증됨
      }
    } catch (error) {
      const _error = error as unknown as {code?: string};

      if (_error?.code === appleAuth.Error.CANCELED) {
        toastShow('Apple 로그인이 취소되었습니다.');
      } else {
        toastShow(
          'Apple 로그인 과정에서 에러가 발생했습니다.\n앱을 다시 실행 후, 로그인해주세요.',
        );
        console.error(error);
      }
    }
  }

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken: token} = await GoogleSignin.signIn();

      if (token) {
        const response = await postAuthSocialLogin.mutateAsync({
          social: 'Google',
          token,
        });

        const {access, refresh} = response?.data;

        if (access && refresh) {
          onLoginComplete({access, refresh});
        } else {
          // 회원가입 페이지로 이동
          reset({
            index: 0,
            routes: [
              {
                name: 'SignupSocialNavigator',
                params: {email: response.data?.email},
              },
            ],
          });
        }
      }
    } catch (_error) {
      const error = _error as any;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onKakaoLogin = async () => {
    try {
      const {accessToken: token} = (await login()) as KakaoOAuthToken;

      if (token) {
        const response = await postAuthSocialLogin.mutateAsync({
          social: 'Kakao',
          token,
        });

        const {access, refresh} = response?.data;

        if (access && refresh) {
          onLoginComplete({access, refresh});
        } else {
          // 회원가입 페이지로 이동
          reset({
            index: 0,
            routes: [
              {
                name: 'SignupSocialNavigator',
                params: {email: response.data?.email},
              },
            ],
          });
        }
      }
    } catch (error) {}
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
                  onPress={() =>
                    navigate('PasswordReset', {type: 'LOGIN_EMAIL'})
                  }
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
              <AppleLoginButton handlePress={onAppleLogin} />
              <GoogleLoginButton handlePress={onGoogleLogin} />
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default EmailLogin;
