import {Box, Center, HStack, Pressable, Stack, useDisclose} from 'native-base';
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
import {usePatchUserInfo} from '~/api/user';
import {SpeciesData} from '~/../types/api/species';
import {ErrorResponse, ErrorResponseTransform} from '~/../types/api/common';

type Props = NativeStackScreenProps<ParamListBase, 'PetInfoRegister'>;

const STAGE_TEXT_LIST = [
  ['집사님의 성별을 알려주세요'],
  ['집사님이 태어난 년도를 알려주세요'],
  ['집사님과 함께하는', '반려아이의 이름을 알려주세요'],
  ['귀여운 봉식이!', '봉식이는 어떤 동물인가요?'],
  ['봉식이 나이는요?'],
  ['봉식이 성별은 무엇인가요?'],
  ['봉식이와 어디서 함께 살고 계세요?'],
  ['봉식이를 키우면서', '고민되는 점이 있으신가요?'],
  ['아주 좋아요!', '마지막으로 우리 봉삼이', '예쁜 모습 자랑해주실까요?'],
  [''],
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
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <HStack
        space={3}
        h={`${HEADER_HEIGHT}px`}
        justifyContent={'space-between'}
        paddingX={'18px'}
        backgroundColor={colors.grayScale[0]}>
        <Center h="60" w="30">
          <Pressable onPress={onPressBack}>
            <BackIcon />
          </Pressable>
        </Center>
      </HStack>

      {onStartPress ? (
        <Stack
          position={'relative'}
          backgroundColor={colors.grayScale[0]}
          h={APP_HEIGHT - HEADER_HEIGHT - statusbarHeight}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Stack>
            {currentStage !== STAGE_TEXT_LIST.length && (
              <StageBar totalStage={9} currentStage={currentStage} />
            )}

            <Box backgroundColor={colors.grayScale[0]} px={'18px'}>
              {currentStage !== STAGE_TEXT_LIST.length && (
                <Center py={'60px'} height={STAGE_TEXT_BOX_HEIGHT}>
                  <StageTextBox
                    totalStage={9}
                    currentStage={currentStage}
                    stageTextList={STAGE_TEXT_LIST[currentStage - 1]}
                  />
                </Center>
              )}

              <CurrentComponentOfArray index={currentStage}>
                <ChoiceGender
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <PetOwnerBirth
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <PetName
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <PetTypeSelector
                  handlePage={moveToNextPage}
                  onPress={onOpen}
                  petType={petType}
                />
                <PetBirth
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <ChoicePetGender
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <Address
                  handlePage={moveToNextPage}
                  onChangeAddress={onChangeAddress}
                />
                <AnyQuestion
                  handlePage={moveToNextPage}
                  form={form}
                  setForm={setForm}
                />
                <PetImageRegister
                  handlePage={onSubmit}
                  form={form}
                  setForm={setForm}
                />
                <Outro handlePage={() => navigate('tab')} />
              </CurrentComponentOfArray>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Intro onPress={() => setStartPress(true)} />
      )}

      {isOpen && (
        <PetTypeSelectModal
          isOpen={isOpen}
          onClose={onClose}
          setPetType={petType => {
            setForm(prev => ({
              ...prev,
              speciesName: petType.name,
            }));
            setPetType(petType);
          }}
          isEnrollPet
          onPress={() => {}}
        />
      )}
    </SafeAreaView>
  );
}

export default PetInfoRegister;
