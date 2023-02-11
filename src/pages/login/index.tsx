import {Center, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import TmpInitialLogin from '~/assets/images/tmp_initial_login.svg';
import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '~/components/login/button';
import {Dimensions, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import {getData} from '~/utils/storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {usePostAuthSocialLogin} from '~/api/auth/mutations';

// console.log();
/**
 *@description 초기 소셜 로그인 선택 페이지
 */
function InitialLogin() {
  const {navigate, reset} = useNavigation<NavigationProp<RouteList>>();
  const {height: appHeight} = Dimensions.get('screen');

  const postAuthSocialLogin = usePostAuthSocialLogin();

  // 디바이스 높이에 따른 페이지 padding top, bottom 설정
  const containerPaddingTop = `${Math.floor((78 * appHeight) / 812)}px`;

  const onMove = () => navigate('EmailLogin');

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken: token} = await GoogleSignin.signIn();

      if (token) {
        const res = await postAuthSocialLogin.mutateAsync({
          social: 'Google',
          token,
        });
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

  useEffect(() => {
    async function checkFirstOpen() {
      const data = await getData('firstOpen');

      if (!data) {
        // 저장된 데이터가 없으면 처음으로 앱을 킨 상태를 가리킴
        reset({index: 0, routes: [{name: 'AppIntroFirst'}]});
      }
    }

    checkFirstOpen();
  }, []);

  return (
    <SafeAreaView>
      <VStack
        bg={colors.grayScale['0']}
        w="100%"
        h="100%"
        pt={containerPaddingTop}
        pb={'40px'}
        px="18px"
        justifyContent={'space-between'}>
        <VStack>
          <Text
            fontSize="28px"
            color={colors.fussOrange['0']}
            fontWeight="700"
            textAlign="center">
            우당탕탕
          </Text>
          <Text fontSize="28px" textAlign="center" mb="48px" fontWeight="700">
            대소동에 어서오세요!
          </Text>

          <Center>
            <TmpInitialLogin />
          </Center>
        </VStack>

        <VStack>
          <KakaoLoginButton handlePress={() => {}} />
          <AppleLoginButton handlePress={() => {}} />
          <GoogleLoginButton handlePress={onGoogleLogin} />
          <EmailLoginButton handlePress={onMove} />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default InitialLogin;
