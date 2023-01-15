import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import React, {useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {NavigationHookProp, RouteList} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import PhoneVerification from '../phoneVerification';
import PasswordRegister from '../passwordRegister';
import {APP_HEIGHT} from '~/utils/dimension';
import EmailRegister from '../emailRegister';
import NicknameRegister from '../nicknameReigster';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 이메일 회원가입 페이지
 */
function SignUpEmailNavigator() {
  const {goBack} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);

  const onChangeStage = () => {
    setCurrentStage(prev => prev + 1);
  };

  // inline error 방지 (바로 인라인 형태로 넣으면 waring 발생)
  const PhoneVerificationComponent = () => (
    <PhoneVerification onChangeStage={onChangeStage} />
  );

  const EmailRegisterComponent = () => (
    <EmailRegister onChangeStage={onChangeStage} />
  );

  const PasswordRegisterComponent = () => (
    <PasswordRegister onChangeStage={onChangeStage} />
  );

  const NicknameRegisterComponent = () => <NicknameRegister />;

  return (
    <Box h={APP_HEIGHT}>
      <Box>
        <Header leftButton={<BackIcon onPress={goBack} />} />

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
  );
}

export default SignUpEmailNavigator;
