import {Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {HEADER_HEIGHT} from '~/constants/heights';
import {STAGE_TEXT_BOX_HEIGHT} from '~/pages/signup/petInfoRegister';
import {APP_HEIGHT} from '~/utils/dimension';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {colors} from '~/theme/theme';
import StageTextBox from '~/components/common/stage/StageTextBox';

interface Props {
  children?: React.ReactNode;
  buttonPress: () => void;
  currentStage?: number;
  possibleButtonPress?: boolean;
}

const PET_INFO_REGISTER_STAGE_TEXT_LIST = [
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

/**
 *@description 상단 statusbar와 하단 button을 제외한 영역의 레이아웃
 */

function LayoutContainer({
  children,
  buttonPress,
  currentStage,
  possibleButtonPress = false,
}: Props) {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      alignItems={'center'}
      pt="60px"
      px="18px"
      bgColor={colors.grayScale[0]}
      h={APP_HEIGHT - statusbarHeight - HEADER_HEIGHT}>
      <StageTextBox
        currentStage={currentStage || 1}
        stageTextList={PET_INFO_REGISTER_STAGE_TEXT_LIST}
      />

      {children}
      <Stack w={'100%'} position={'absolute'} bottom={'40px'}>
        <RedActiveLargeButton
          active={possibleButtonPress}
          text={'다음'}
          handlePress={buttonPress}
        />
      </Stack>
    </Stack>
  );
}

export default LayoutContainer;
