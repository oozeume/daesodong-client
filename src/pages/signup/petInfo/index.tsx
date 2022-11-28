import {Box, Center, HStack, Pressable, Stack, useDisclose} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {DEVICE_HEIGHT} from '~/utils/dimention';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {HEADER_HEIGHT} from '~/constants/heights';
import Intro from '~/components/signup/petInfo/Intro';
import ChoiceGender from '~/components/signup/petInfo/choiceGender';
import PetSitterBirth from '~/components/signup/petInfo/petSitterBirth';
import PetName from '~/components/signup/petInfo/petName';
import PetTypeSelector from '~/components/signup/petInfo/petTypeSelector';
import PetBirth from '~/components/signup/petInfo/petBirth';
import Address from '~/components/signup/petInfo/address';
import AnyQuestion from '~/components/signup/petInfo/anyQuestion';
import PetImageRegister from '~/components/signup/petInfo/petImageRegister';
import Outro from '~/components/signup/petInfo/outro';
import ChoicePetGender from '~/components/signup/petInfo/choicePetGender';
import PetTypeSelectModal from '~/components/signup/petInfo/petTypeSelectModal';

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
 */

function PetInfoRegister({navigation}: Props) {
  const [currentStage, setCurrentStage] = useState(1);

  const onPressBack = () => {
    if (currentStage === 1) {
      navigation.goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  const statusbarHeight = getStatusBarHeight();
  const [onStartPress, setStartPress] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [petType, setPetType] = useState({id: '', title: ''});

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
          h={DEVICE_HEIGHT - HEADER_HEIGHT - statusbarHeight - 6}
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
                <ChoiceGender handlePage={moveToNextPage} />
                <PetSitterBirth handlePage={moveToNextPage} />
                <PetName handlePage={moveToNextPage} />
                <PetTypeSelector
                  handlePage={moveToNextPage}
                  onPress={onOpen}
                  petType={petType}
                />
                <PetBirth handlePage={moveToNextPage} />
                <ChoicePetGender handlePage={moveToNextPage} />
                <Address handlePage={moveToNextPage} />
                <AnyQuestion handlePage={moveToNextPage} />
                <PetImageRegister handlePage={moveToNextPage} />
                <Outro
                  handlePage={() => navigation.navigate('DeveloperMenu')}
                />
              </CurrentComponentOfArray>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Intro onPress={() => setStartPress(true)} />
      )}

      <PetTypeSelectModal
        isOpen={isOpen}
        onClose={onClose}
        setPetType={setPetType}
      />
    </SafeAreaView>
  );
}

export default PetInfoRegister;
