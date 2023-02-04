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
import {APP_HEIGHT} from '~/utils/dimension';
import {INIT_SIGNUP_FORM, initPetInfoForm} from '~/constants/signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChoiceGenderRegister from '../petInfoRegister/choiceGender';
import PetOwnerBirthRegister from '../petInfoRegister/petOwnerBirth';
import PetNameRegister from '../petInfoRegister/petName';
import PetTypeRegister from '../petInfoRegister/petType';
import PetBirthRegister from '../petInfoRegister/petBirth';
import PetGenderRegister from '../petInfoRegister/petGender';
import AddressRegister from '../petInfoRegister/address';
import AnyQuestionRegister from '../petInfoRegister/anyQuestion';
import PetImageRegister from '../petInfoRegister/petImage';

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

  const PetOwnerBirthRegisterComponent = () => (
    <PetOwnerBirthRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const PetNameRegisterComponent = () => (
    <PetNameRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const PetTypeRegisterComponent = () => (
    <PetTypeRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const PetBirthRegisterComponent = () => (
    <PetBirthRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const PetGenderRegisterComponent = () => (
    <PetGenderRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const AddressRegisterComponent = () => (
    <AddressRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const AnyQuestionRegisterComponent = () => (
    <AnyQuestionRegister
      onChangeStage={onChangeStage}
      setPreviousURL={setPreviousURL}
      form={form}
      setForm={setForm}
    />
  );

  const PetImageRegisterComponent = () => (
    <PetImageRegister
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

          <Stack.Screen
            name="PetOwnerBirthRegister"
            component={PetOwnerBirthRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PetNameRegister"
            component={PetNameRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PetTypeRegister"
            component={PetTypeRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PetBirthRegister"
            component={PetBirthRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PetGenderRegister"
            component={PetGenderRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AddressRegister"
            component={AddressRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AnyQuestionRegister"
            component={AnyQuestionRegisterComponent}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PetImageRegister"
            component={PetImageRegisterComponent}
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
