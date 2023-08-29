import {Center, Text, VStack} from 'native-base';
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
import {
  getData,
  getSecurityData,
  removeSecurityData,
  setSecurityData,
} from '~/utils/storage';
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
import _ from 'lodash';
import {useGetUser} from '~/api/user/queries';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import useToastShow from '~/hooks/useToast';
import useBackHandler from '~/hooks/useBackHandler';

/**
 *@description 초기 소셜 로그인 선택 페이지
 */
function InitialLogin() {
  const {navigate, reset} = useNavigation<NavigationProp<RouteList>>();
  const {height: appHeight} = Dimensions.get('screen');
  const {toastShow} = useToastShow();

  const [isInitialLoading, setInitialLoading] = useState(true);

  const postAuthRefresh = usePostAuthRefresh();
  const postAuthSocialLogin = usePostAuthSocialLogin();
  const getUser = useGetUser(false);
  useBackHandler();

  // 디바이스 높이에 따른 페이지 padding top, bottom 설정
  const containerPaddingTop = `${Math.floor((78 * appHeight) / 812)}px`;

  const onMove = () => navigate('EmailLogin');

  const onLoginComplete = async (tokenData: {
    access: string;
    refresh: string;
  }) => {
    try {
      await setSecurityData(config.ACCESS_TOKEN_NAME, tokenData.access);
      await setSecurityData(config.REFRESH_TOKEN_NAME, tokenData.refresh);

      const _userData = await getUser.refetch();
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

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken: token} = await GoogleSignin.signIn();

      if (!_.isEmpty(token) && token) {
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

  const onKakaoLogin = async () => {
    try {
      const {accessToken: token} = (await login()) as KakaoOAuthToken;

      if (!_.isEmpty(token)) {
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

  /**
   *@description 토큰 확인 및 유저 데이터 확인을 통한 자동 로그인 로직
   */
  async function checkUserData() {
    try {
      const userAccessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);

      /**
       * 1-1) 유저 토큰이 있을 경우 > 검사(토큰이 만료되었는지 여부 판별)
       * 1-1-1) access 만료 x > 펫정보 검사(유저 정보 조회), 시설 메인 페이지로 이동
       * 1-1-2) access 만료 o, refresh 만료 x > 업데이트
       * 1-1-3) access 만료 o, refresh 만료 o > 토큰 삭제 / 로딩 종료 / 로그인 화면
       * > 유저 정보 검사(펫 등록 여부) > 있으면 시설 메인 페이지로 이동 or 없으면 펫정보 등록 화면으로 이동
       * 1-2) 유저 토큰이 없을 경우 > 로딩 종료 / 로그인 화면
       */

      if (userAccessToken) {
        const decode = await decodeAuthToken();
        const [access, refresh] = decode ?? [null, null];

        let tokenStatus:
          | 'ACCESS_ALIVE'
          | 'ACCESS_EXPIRED_REFRESH_ALIVE'
          | 'ACCESS_EXPIRED_REFRESH_EXPIRED'
          | 'DEFAULT' = 'DEFAULT';

        if (access && refresh && access?.exp && refresh?.exp) {
          const isAccessExpired = dayjs(access.exp * 1000).isBefore(
            dayjs().subtract(10, 'minute'),
          );
          const isRefreshExpired = dayjs(refresh.exp * 1000).isBefore(
            dayjs().subtract(10, 'minute'),
          );

          if (!isAccessExpired) {
            // access 만료 안됨 > 시설 페이지 이동
            // reset({index: 0, routes: [{name: 'tab'}]});
            tokenStatus = 'ACCESS_ALIVE';
          } else if (isAccessExpired && !isRefreshExpired) {
            // access 만료, refresh 만료 안됨 > 토큰 갱신 api 요청
            try {
              await postAuthRefresh.mutateAsync();
              tokenStatus = 'ACCESS_EXPIRED_REFRESH_ALIVE';
            } catch (error) {
              // 회원 탈퇴한 유저
              tokenStatus = 'ACCESS_EXPIRED_REFRESH_EXPIRED';
            }
          } else {
            // 둘다 만료
            tokenStatus = 'ACCESS_EXPIRED_REFRESH_EXPIRED';
          }
        } else {
          tokenStatus = 'ACCESS_EXPIRED_REFRESH_EXPIRED';
        }

        if (tokenStatus === 'ACCESS_EXPIRED_REFRESH_EXPIRED') {
          removeSecurityData(config.ACCESS_TOKEN_NAME);
          removeSecurityData(config.REFRESH_TOKEN_NAME);
        } else {
          // 현 토큰 혹은 갱신된 토큰으로 유저 정보 조회
          const userResponse = await getUser.refetch();

          if (userResponse) {
            if (
              !_.isEmpty(userResponse.data) &&
              _.isEmpty(userResponse.data?.petInfoList)
            ) {
              // 펫 정보 미등록으로 인한 펫 등록 페이지로 이동
              navigate('SignupPetInfoNavigator');
            } else if (_.isEmpty(userResponse.data)) {
              // 유저 탈퇴 후, 토큰이 남아 있는 경우
              removeSecurityData(config.ACCESS_TOKEN_NAME);
              removeSecurityData(config.REFRESH_TOKEN_NAME);
            } else {
              // 모든 정보가 등록된 유저일 경우

              reset({
                index: 0,
                routes: [
                  {
                    name: 'tab',
                  },
                ],
              });
            }
          } else {
            // 응답값이 없을 경우
            removeSecurityData(config.ACCESS_TOKEN_NAME);
            removeSecurityData(config.REFRESH_TOKEN_NAME);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    setInitialLoading(false);
  }

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

    checkUserData();
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
            <AppleLoginButton handlePress={onAppleLogin} />
            <GoogleLoginButton handlePress={onGoogleLogin} />
            <EmailLoginButton handlePress={onMove} />
          </VStack>
        </VStack>
      )}
    </SafeAreaView>
  );
}

export default InitialLogin;
