import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
  RouteList,
} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import {APP_HEIGHT} from '~/utils/dimension';
import {
  PET_INFO_NAVIGATOR_ROUTE_LIST,
  initPetInfoForm,
} from '~/constants/signup';
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
import {Keyboard} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {getData, removeData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';

const Stack = createNativeStackNavigator<RouteList>();

/**
 *@description 집사정보 반려동물 등록 페이지 네비게이터
 */
function SignupPetInfoNavigator() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState(initPetInfoForm);
  const totalStage = 9;

  // 네비게이터 안에 네비게이터라서 이전 URL를 따로 받아야함
  const [previousURL, setPreviousURL] = useState<
    PetInfoRegisterNavigatorRouteList[]
  >(['EmailLogin']);

  const onChangeStage = () => {
    setCurrentStage(prev => prev + 1);
  };

  const onBack = () => {
    setCurrentStage(prev => {
      if (prev === 0) return prev;

      return prev - 1;
    });

    setPreviousURL(prev => prev.slice(0, prev.length - 1));
    if (previousURL.length > 1) navigate(previousURL[previousURL.length - 2]);
  };

  useEffect(() => {
    async function loadFormData() {
      // 입력한 집사 정보 스토리지 제거 로직 주석처리
      // await removeData(storageKeys.petInfoRegister.form);
      // await removeData(storageKeys.petInfoRegister.state);

      const loadForm = await getData(storageKeys.petInfoRegister.form);
      const loadState = await getData(storageKeys.petInfoRegister.state);

      if (loadForm && loadState) {
        setForm(JSON.parse(loadForm));
        setCurrentStage(Number(loadState));

        const _routeList = PET_INFO_NAVIGATOR_ROUTE_LIST.slice(
          0,
          Number(loadState) + 1,
        );

        setPreviousURL(_routeList);
        navigate(_routeList[_routeList.length - 1]);
      }
    }

    loadFormData();
  }, []);

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <Box h={APP_HEIGHT}>
          <Box>
            <Header
              isRemoveTopPosition
              leftButton={<BackIcon onPress={onBack} />}
            />

            <StageBar totalStage={totalStage} currentStage={currentStage} />
          </Box>

          <Stack.Navigator>
            <Stack.Screen
              name="ChoiceGenderRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <ChoiceGenderRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={1}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetOwnerBirthRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetOwnerBirthRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={2}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetNameRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetNameRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={3}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetTypeRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetTypeRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={4}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetBirthRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetBirthRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={5}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetGenderRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetGenderRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={6}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="AddressRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <AddressRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={7}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="AnyQuestionRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <AnyQuestionRegister
                  onChangeStage={onChangeStage}
                  setPreviousURL={setPreviousURL}
                  form={form}
                  setForm={setForm}
                  currentStage={8}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="PetImageRegister"
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}>
              {() => (
                <PetImageRegister
                  form={form}
                  setForm={setForm}
                  currentStage={9}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default SignupPetInfoNavigator;
