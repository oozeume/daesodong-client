import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import React, {useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {
  NavigationHookProp,
  RouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import PhoneVerification from '../register/phoneVerification';
import PasswordRegister from '../register/passwordRegister';
import {APP_HEIGHT} from '~/utils/dimension';
import EmailRegister from '../register/emailRegister';
import NicknameRegister from '../register/nicknameReigster';
import {INIT_SIGNUP_FORM} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 이메일 회원가입 페이지 네비게이터
 */
function SignUpEmailNavigator() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);
  const [signupForm, setSignupForm] = useState(INIT_SIGNUP_FORM);

  // 네비게이터 안에 네비게이터라서 이전 URL를 따로 받아야함
  const [previousURL, setPreviousURL] = useState<SignupNavigatorRouteList[]>([
    'EmailLogin',
  ]);

  const onChangeStage = () => {
    setCurrentStage(prev => prev + 1);
  };

  const onBack = () => {
    setCurrentStage(prev => {
      if (prev === 0) return prev;

      return prev - 1;
    });
    setPreviousURL(prev => prev.slice(0, prev.length - 1));
    navigate(previousURL[previousURL.length - 1] as any);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Box h={Platform.OS === 'android' ? APP_HEIGHT + 14 : APP_HEIGHT}>
        <Box>
          <Header
            isRemoveTopPosition
            leftButton={<BackIcon onPress={onBack} />}
          />

          <StageBar totalStage={4} currentStage={currentStage} />
        </Box>

        <Stack.Navigator>
          <Stack.Screen
            name="PhoneVerification"
            component={() => (
              <PhoneVerification
                onChangeStage={onChangeStage}
                setPreviousURL={setPreviousURL}
                signupForm={signupForm}
                setSignupForm={setSignupForm}
              />
            )}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EmailRegister"
            component={() => (
              <EmailRegister
                onChangeStage={onChangeStage}
                setPreviousURL={setPreviousURL}
                signupForm={signupForm}
                setSignupForm={setSignupForm}
              />
            )}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PasswordRegister"
            component={() => (
              <PasswordRegister
                onChangeStage={onChangeStage}
                setPreviousURL={setPreviousURL}
                signupForm={signupForm}
                setSignupForm={setSignupForm}
              />
            )}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="NicknameRegister"
            component={() => <NicknameRegister signupForm={signupForm} />}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Box>
    </SafeAreaView>
  );
}

export default SignUpEmailNavigator;
