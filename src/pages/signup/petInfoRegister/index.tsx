import {
  Box,
  Center,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  Stack,
  VStack,
  useDisclose,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {APP_HEIGHT} from '~/utils/dimension';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {HEADER_HEIGHT} from '~/constants/heights';
import Intro from '~/components/signup/petInfo/Intro';
import ChoiceGender from '~/components/signup/petInfo/ChoiceGender';
import PetOwnerBirth from '~/components/signup/petInfo/PetOwnerBirth';
import PetName from '~/components/signup/petInfo/PetName';
import PetTypeSelector from '~/components/signup/petInfo/PetTypeSelector';
import PetBirth from '~/components/signup/petInfo/PetBirth';
import Address from '~/components/signup/petInfo/Address';
import AnyQuestion from '~/components/signup/petInfo/AnyQuestion';
import PetImageRegister from '~/components/signup/petInfo/PetImageRegister';
import Outro from '~/components/signup/petInfo/Outro';
import ChoicePetGender from '~/components/signup/petInfo/ChoicePetGender';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import {initPetInfoForm} from '~/constants/signup';
import {NavigationHookProp} from '~/../types/navigator';
import {usePatchUserInfo} from '~/api/user/mutation';
import {SpeciesData} from '~/../types/api/species';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import _ from 'lodash';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

type Props = NativeStackScreenProps<ParamListBase, 'PetInfoRegister'>;

const STAGE_TEXT_LIST = [
  '집사님의 성별을 알려주세요',
  '집사님이 태어난 년도를 알려주세요',
  '집사님과 함께하는\n반려아이의 이름을 알려주세요',
  '귀여운 봉식이!\n봉식이는 어떤 동물인가요?',
  '봉식이 나이는요?',
  '봉식이 성별은 무엇인가요?',
  '봉식이와 어디서 함께 살고 계세요?',
  '봉식이를 키우면서\n고민되는 점이 있으신가요?',
  '아주 좋아요!\n마지막으로 우리 봉삼이\n예쁜 모습 자랑해주실까요?',
  '',
];

export const STAGE_TEXT_BOX_HEIGHT = 172;

/**
 *@description 반려동물 등록 페이지
 *@todo 거주지 부터 하고 api 만들기
 */

function PetInfoRegister() {
  const {navigate, goBack} = useNavigation<NavigationHookProp>();
  const statusbarHeight = getStatusBarHeight();

  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState(initPetInfoForm);

  const [petType, setPetType] = useState<SpeciesData>();
  const [onStartPress, setStartPress] = useState(false);

  const {mutateAsync} = usePatchUserInfo();

  const onPressBack = () => {
    if (currentStage === 1) {
      goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  const onChangeAddress = (address: string) => {
    setForm(() => ({...form, address}));
  };

  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  const onSubmit = async () => {
    await mutateAsync(form);

    moveToNextPage();
  };

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.grayScale[0]}}>
        <KeyboardAvoidingView
          flex={1}
          behavior={'padding'}
          keyboardVerticalOffset={40}>
          <HStack
            h={`${HEADER_HEIGHT}px`}
            paddingX={'18px'}
            backgroundColor={colors.grayScale[0]}>
            <Center h="60" w="30">
              <Pressable onPress={onPressBack}>
                <BackIcon />
              </Pressable>
            </Center>
          </HStack>

          <VStack flex={1} justifyContent={'space-between'} paddingX={'18px'}>
            <TextInput
              style={styles.input}
              onChangeText={name => setForm(prev => ({...prev, name}))}
              value={form.name}
              placeholder={'이름을 입력해주세요'}
            />

            <VStack mb={'40px'}>
              <RedActiveLargeButton
                active={true}
                text={'인증번호 전송'}
                handlePress={() => {}}
              />
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});

export default PetInfoRegister;
