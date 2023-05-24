import {KeyboardAvoidingView, Text, VStack} from 'native-base';
import React from 'react';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {colors} from '~/theme/theme';
import StageTextBox from '~/components/common/stage/StageTextBox';

interface Props {
  children?: React.ReactNode;
  buttonPress: () => void;
  currentStage?: number;
  possibleButtonPress?: boolean;
  isSkipPage?: boolean;
  onSkipPage?: () => void;
  petName?: string;
}

/**
 *@description 상단 statusbar와 하단 button을 제외한 영역의 레이아웃
 */

function LayoutContainer({
  children,
  buttonPress,
  currentStage,
  isSkipPage,
  onSkipPage,
  petName = '',
  possibleButtonPress = false,
}: Props) {
  const PET_INFO_REGISTER_STAGE_TEXT_LIST = [
    '집사님의 성별을 알려주세요',
    '집사님이 태어난 년도를 알려주세요',
    '집사님과 함께하는\n반려아이의 이름을 알려주세요',
    `귀여운 ${petName}!\n${petName}는 어떤 동물인가요?`,
    `${petName} 나이는요?`,
    `${petName} 성별은 무엇인가요?`,
    `${petName}와 어디서 함께 살고 계세요?`,
    `${petName}를 키우면서\n고민되는 점이 있으신가요?`,
    `아주 좋아요!\n마지막으로 우리 ${petName}\n예쁜 모습 자랑해주실까요?`,
  ];

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={'padding'}
      keyboardVerticalOffset={40}>
      <VStack
        alignItems={'center'}
        pt="60px"
        px="18px"
        bgColor={colors.grayScale[0]}
        flex={1}>
        <VStack w="100%">
          {currentStage !== 0 && (
            <StageTextBox
              currentStage={currentStage || 1}
              stageTextList={PET_INFO_REGISTER_STAGE_TEXT_LIST}
            />
          )}
          {children}
        </VStack>

        <VStack w={'100%'} position={'absolute'} bottom="100px">
          {isSkipPage && (
            <Text
              w="100%"
              textAlign={'center'}
              mb="24px"
              onPress={onSkipPage}
              color={colors.grayScale[60]}>
              건너뛰기
            </Text>
          )}

          <RedActiveLargeButton
            active={possibleButtonPress}
            text={'다음'}
            handlePress={buttonPress}
          />
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default LayoutContainer;
