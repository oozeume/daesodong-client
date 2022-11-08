import React from 'react';
import {Center, Text, VStack} from 'native-base';

import {colors} from '~/theme/theme';

interface Props {
  totalStage: number;
  currentStage: number;
  stageTextList: string[];
}

/**
 * 스테이지별 텍스트 박스
 * @param {number} totalStage - 총 스테이지 수
 * @param {number} currentStage - 현재 스테이지
 * @param {string[]} stageTextList - 표시될 텍스트 리스트
 */
function StageTextBox({totalStage, currentStage, stageTextList}: Props) {
  return (
    <VStack space={2}>
      <Center>
        <Text fontSize={13} fontWeight={'400'} color={colors.grayScale[50]}>
          {currentStage} / {totalStage}
        </Text>
      </Center>
      <VStack space={1}>
        <Center>
          {stageTextList?.map(text => (
            <Text
              key={`stage_text_${text}`}
              fontSize={20}
              fontWeight={'500'}
              color={colors.grayScale[80]}>
              {text}
            </Text>
          ))}
        </Center>
      </VStack>
    </VStack>
  );
}

export default StageTextBox;
