import React from 'react';
import {Center, Text, VStack} from 'native-base';
import {colors} from '~/theme/theme';

interface Props {
  currentStage: number;
  stageTextList: string[];
}

/**
 * 스테이지별 텍스트 박스
 * @param {number} currentStage - 현재 스테이지
 * @param {string[]} stageTextList - 표시될 텍스트 리스트
 */
function StageTextBox({currentStage, stageTextList}: Props) {
  const text = stageTextList[currentStage - 1];
  return (
    <VStack space={2} mb="60px">
      <Center>
        <Text fontSize={13} fontWeight={'400'} color={colors.grayScale[50]}>
          {currentStage} / {stageTextList.length}
        </Text>
      </Center>

      <VStack space={1}>
        <Center>
          <Text
            key={`stage_text_${currentStage}`}
            fontSize={20}
            fontWeight={'500'}
            color={colors.grayScale[80]}>
            {text}
          </Text>
        </Center>
      </VStack>
    </VStack>
  );
}

export default StageTextBox;
