import {useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {
  NavigationHookProp,
  RouteHookProp,
  RouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import PhoneVerification from '../register/phoneVerification';
import {APP_HEIGHT} from '~/utils/dimension';
import NicknameRegister from '../register/nicknameReigster';
import {
  INIT_SOCIAL_SIGNUP_FORM,
  SOCIAL_SIGNUP_STAGE_TEXT_LIST,
} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Keyboard, Platform} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import _ from 'lodash';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 소셜 회원가입 페이지 네비게이터
 */
function SignupSocialNavigator() {
  const route = useRoute<RouteHookProp<'SignupSocialNavigator'>>();
  const {navigate} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);
  const [signupForm, setSignupForm] = useState(INIT_SOCIAL_SIGNUP_FORM);
  const {email} = route.params;

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

  useEffect(() => {
    if (!_.isEmpty(email)) {
      setSignupForm(prev => ({...prev, email}));
    }
  }, [route.params]);

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Box h={Platform.OS === 'android' ? APP_HEIGHT + 14 : APP_HEIGHT}>
          <Box>
            <Header
              isRemoveTopPosition
              leftButton={<BackIcon onPress={onBack} />}
            />

            <StageBar totalStage={2} currentStage={currentStage} />
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
                  stageTextList={SOCIAL_SIGNUP_STAGE_TEXT_LIST}
                  failNextPage="NicknameRegister"
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
                  currentStage={2}
                  stageTextList={SOCIAL_SIGNUP_STAGE_TEXT_LIST}
                  registerType="SOCIAL"
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default SignupSocialNavigator;
