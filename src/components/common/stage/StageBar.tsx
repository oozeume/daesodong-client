import React from 'react';
import _ from 'lodash';
import {Box, HStack} from 'native-base';

import {colors} from '~/theme/theme';

interface Props {
  totalStage: number;
  currentStage: number;
}

/**
 * 페이지 스테이지를 나타내는 StageBar 컴포넌트
 * @param {number} totalStage 총 스테이지 수
 * @param {number} currentStage 현재 스테이지
 */
function StageBar({totalStage, currentStage}: Props) {
  return (
    <HStack w={'100%'}>
      {_.range(0, totalStage).map(stage => (
        <Box
          key={`stage_${stage}`}
          w={`${100 / totalStage}%`}
          h={'1px'}
          backgroundColor={
            stage + 1 <= currentStage
              ? colors.fussOrange[0]
              : colors.grayScale[20]
          }
        />
      ))}
    </HStack>
  );
}

export default StageBar;
