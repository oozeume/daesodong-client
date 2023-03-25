import {Box, Center, Image, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
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
import {getData, removeSecurityData} from '~/utils/storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {usePostAuthRefresh, usePostAuthSocialLogin} from '~/api/auth/mutations';
import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import {decodeAuthToken} from '~/utils/decode';
import dayjs from 'dayjs';
import {config} from '~/utils/config';
import SplashImage from '~/assets/images/splash.svg';
import {APP_HEIGHT} from '~/utils/dimension';

/**
 *@description 초기 소셜 로그인 선택 페이지
 */
function InitialLogin() {
  const {navigate, reset} = useNavigation<NavigationProp<RouteList>>();
  const {height: appHeight} = Dimensions.get('screen');

  const [isInitialLoading, setInitialLoading] = useState(true);

  const postAuthRefresh = usePostAuthRefresh();
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

  const onKakaoLogin = async () => {
    try {
      const {accessToken: token} = (await login()) as KakaoOAuthToken;

      if (token) {
        const res = await postAuthSocialLogin.mutateAsync({
          social: 'Kakao',
          token,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function checkFirstOpen() {
      const data = await getData('firstOpen');

      if (!data) {
        setInitialLoading(false);

        // 저장된 데이터가 없으면 처음으로 앱을 킨 상태를 가리킴
        reset({index: 0, routes: [{name: 'AppIntroFirst'}]});
      }
    }

    checkFirstOpen();

    /**
     *@description 토큰 확인을 통한 자동 로그인 로직
     */
    decodeAuthToken().then(decode => {
      const [access, refresh] = decode ?? [null, null];

      if (access && refresh && access?.exp && refresh?.exp) {
        const isAccessExpired = dayjs(access.exp * 1000).isBefore(
          dayjs().subtract(10, 'minute'),
        );
        const isRefreshExpired = dayjs(refresh.exp * 1000).isBefore(
          dayjs().subtract(10, 'minute'),
        );

        if (!isAccessExpired) {
          // access 만료 안됨 > 시설 페이지 이동
          reset({index: 0, routes: [{name: 'tab'}]});
        } else if (isAccessExpired && !isRefreshExpired) {
          // access 만료, refresh 만료 안됨 > 토큰 갱신 api 요청
          postAuthRefresh.mutateAsync().then(() => {
            reset({index: 0, routes: [{name: 'tab'}]});
          });
        } else {
          // 둘다 만료
          removeSecurityData(config.ACCESS_TOKEN_NAME);
          removeSecurityData(config.REFRESH_TOKEN_NAME);
        }
      }

      setInitialLoading(false);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isInitialLoading
          ? colors.fussOrange[0]
          : colors.grayScale[0],
      }}>
      {isInitialLoading ? (
        <Center w="100%" h={APP_HEIGHT} bgColor={colors.fussOrange[0]}>
          <SplashImage />
        </Center>
      ) : (
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
            <KakaoLoginButton handlePress={onKakaoLogin} />
            <AppleLoginButton handlePress={() => {}} />
            <GoogleLoginButton handlePress={onGoogleLogin} />
            <EmailLoginButton handlePress={onMove} />
          </VStack>
        </VStack>
      )}
    </SafeAreaView>
  );
}

export default InitialLogin;
