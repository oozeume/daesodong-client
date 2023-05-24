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
import {
  EMAIL_SIGNUP_STAGE_TEXT_LIST,
  INIT_EMAIL_SIGNUP_FORM,
} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Keyboard, Platform} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {SignupForm} from '~/../types/signup';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 이메일 회원가입 페이지 네비게이터
 */
function SignUpEmailNavigator() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);
  const [signupForm, setSignupForm] = useState<SignupForm>(
    INIT_EMAIL_SIGNUP_FORM,
  );

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
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
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
              options={{
                headerShown: false,
              }}>
              {() => (
                <PhoneVerification
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  signupForm={signupForm}
                  setSignupForm={setSignupForm}
                  currentStage={1}
                  stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST}
                  failNextPage="EmailRegister"
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="EmailRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <EmailRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  signupForm={signupForm}
                  setSignupForm={setSignupForm}
                  currentStage={2}
                  stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PasswordRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PasswordRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  setSignupForm={setSignupForm}
                  currentStage={3}
                  stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="NicknameRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <NicknameRegister
                  signupForm={signupForm}
                  currentStage={4}
                  stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST}
                  registerType="EMAIL"
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default SignUpEmailNavigator;
