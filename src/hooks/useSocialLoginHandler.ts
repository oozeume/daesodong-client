import {usePostAuthSocialLogin} from '~/api/auth/mutations';
import useToastShow from './useToast';
import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  getData,
  getSecurityData,
  removeSecurityData,
  setSecurityData,
} from '~/utils/storage';
import {config} from '~/utils/config';
import {useGetUser} from '~/api/user/queries';
import _ from 'lodash';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

/**
 *@description 소셜 로그인 로직 훅 추가
 */
function useSocialLoginHandler() {
  const postAuthSocialLogin = usePostAuthSocialLogin();
  const {toastShow} = useToastShow();
  const {navigate, reset} = useNavigation<NavigationProp<RouteList>>();
  const getUser = useGetUser(false);

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
          navigate('SignupSocialNavigator', {email: response.data?.email});
        }
      }
    } catch (error) {}
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

          navigate('SignupSocialNavigator', {email: response.data?.email});
        }
      }
    } catch (_error) {
      const error = _error as any;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        toastShow('구글 소셜 로그인 과정에서 오류가 발생했습니다.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        toastShow('구글 소셜 로그인이 진행 중입니다.');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        toastShow('구글 소셜 로그인을 이용할 수 없습니다.');
      } else {
        // some other error happened
        toastShow('구글 소셜 로그인 과정에서 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  async function onAppleLoginAndroid() {
    // TODO
    // server apple ios login api 만들면 연결하기
    try {
      appleAuthAndroid.configure({
        clientId: 'com.web.daesodong',
        redirectUri: 'https://server.daesodong.org/callback',
        scope: appleAuthAndroid.Scope.EMAIL,
        responseType: appleAuthAndroid.ResponseType.ALL,
      });

      const response = await appleAuthAndroid.signIn();
      if (response) {
        const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
        const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
        const user = response.user; // Present when user first logs in using appleId
        const state = response.state; // A copy of the state value that was passed to the initial request.
      }
    } catch (error) {
      const _error = error as unknown as {
        message: string;
      };

      if (_error && _error.message) {
        switch (_error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
            console.log('appleAuthAndroid not configured yet.');
            break;
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            console.log('Apple signin failed.');
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            console.log('User cancelled Apple signin.');
            break;
          default:
            break;
        }
      }
    }
  }

  async function onAppleLoginIOS() {
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

  return {onKakaoLogin, onGoogleLogin, onAppleLoginAndroid, onAppleLoginIOS};
}

export default useSocialLoginHandler;
