import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import React, {useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
  RouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import PhoneVerification from '../phoneVerification';
import PasswordRegister from '../passwordRegister';
import {APP_HEIGHT} from '~/utils/dimension';
import EmailRegister from '../emailRegister';
import NicknameRegister from '../nicknameReigster';
import {INIT_SIGNUP_FORM, initPetInfoForm} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChoiceGenderRegister from '../petInfoRegister/choiceGender';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 집사정보 반려동물 등록 페이지 네비게이터
 */
function SignupPetInfoNavigator() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState(initPetInfoForm);

  // 네비게이터 안에 네비게이터라서 이전 URL를 따로 받아야함
  const [previousURL, setPreviousURL] = useState<
    PetInfoRegisterNavigatorRouteList[]
  >(['ChoiceGenderRegister']);

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
  const ChoiceGenderRegisterComponent = () => (
    <ChoiceGenderRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
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
            name="ChoiceGenderRegister"
            component={ChoiceGenderRegisterComponent}
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

export default SignupPetInfoNavigator;
