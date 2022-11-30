import {Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {HEADER_HEIGHT} from '~/constants/heights';
import {STAGE_TEXT_BOX_HEIGHT} from '~/pages/signup/petInfo';
import {DEVICE_HEIGHT} from '~/utils/dimension';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  children?: React.ReactNode;
  buttonPress?: () => void;
}

/**
 *@description 상단 statusbar와 하단 button을 제외한 영역의 레이아웃
 */

function LayoutContainer({children, buttonPress}: Props) {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      h={
        DEVICE_HEIGHT - statusbarHeight - HEADER_HEIGHT - STAGE_TEXT_BOX_HEIGHT
      }>
      {children}
      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Pressable
          onPress={buttonPress}
          variant={false ? 'opacityFussOrange' : 'solidFussOrange'}>
          <Text variant={false ? 'opacityFussOrange' : 'solidFussOrange'}>
            확인
          </Text>
        </Pressable>
      </Stack>
    </Stack>
  );
}

export default LayoutContainer;
