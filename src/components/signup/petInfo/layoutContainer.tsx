import {Stack} from 'native-base';
import React from 'react';
import {HEADER_HEIGHT} from '~/constants/heights';
import {STAGE_TEXT_BOX_HEIGHT} from '~/pages/signup/petInfo';
import {DEVICE_HEIGHT} from '~/utils/dimention';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  children?: React.ReactNode;
}

/**
 *@description 상단 statusbar와 하단 button의 레이아웃을 위한 container 역할 컴포넌트
 */

function LayoutContainer({children}: Props) {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      h={
        DEVICE_HEIGHT - statusbarHeight - HEADER_HEIGHT - STAGE_TEXT_BOX_HEIGHT
      }>
      {children}
    </Stack>
  );
}

export default LayoutContainer;
