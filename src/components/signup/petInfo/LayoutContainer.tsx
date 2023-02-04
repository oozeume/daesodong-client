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
  possibleButtonPress?: boolean;
}

const PET_INFO_REGISTER_STAGE_TEXT_LIST = ['집사님의 성별을 알려주세요'];

/**
 *@description 상단 statusbar와 하단 button을 제외한 영역의 레이아웃
 */

function LayoutContainer({
  children,
  buttonPress,
  possibleButtonPress = false,
}: Props) {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      bgColor={colors.grayScale[0]}
      h={APP_HEIGHT - statusbarHeight - HEADER_HEIGHT}>
      <StageTextBox
        totalStage={4}
        currentStage={2}
        stageTextList={PET_INFO_REGISTER_STAGE_TEXT_LIST}
      />

      {children}
      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <RedActiveLargeButton text={'확인'} handlePress={buttonPress} />
      </Stack>
    </Stack>
  );
}

export default LayoutContainer;
