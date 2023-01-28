import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box, KeyboardAvoidingView} from 'native-base';
import React, {useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {
  NavigationHookProp,
  RouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import PhoneVerification from '../phoneVerification';
import PasswordRegister from '../passwordRegister';
import {APP_HEIGHT} from '~/utils/dimension';
import EmailRegister from '../emailRegister';
import NicknameRegister from '../nicknameReigster';
import {INIT_SIGNUP_FORM} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 이메일 회원가입 페이지
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

  // inline error 방지 (바로 인라인 형태로 넣으면 waring 발생)
  const PhoneVerificationComponent = () => (
    <PhoneVerification
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
    />
  );

  const EmailRegisterComponent = () => (
    <EmailRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
    />
  );

  const PasswordRegisterComponent = () => (
    <PasswordRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
    />
  );

  const NicknameRegisterComponent = () => (
    <NicknameRegister signupForm={signupForm} setSignupForm={setSignupForm} />
  );

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Box h={APP_HEIGHT}>
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
            component={PhoneVerificationComponent}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EmailRegister"
            component={EmailRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PasswordRegister"
            component={PasswordRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="NicknameRegister"
            component={NicknameRegisterComponent}
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
