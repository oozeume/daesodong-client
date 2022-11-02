import {Center, Text, VStack} from 'native-base';
import React from 'react';

interface Props {
  totalStage: number;
  currentStage: number;
}

/**
 * 스테이지별 텍스트 박스
 * @param {number} totalStage - 총 스테이지 수
 * @param {number} currentStage - 현재 스테이지
 * @param {PropsWithChildren} children - 스테이지 별 들어갈 텍스트 element
 */
function StageTextBox({
  totalStage,
  currentStage,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <VStack space={2}>
      <Center>
        <Text fontSize={13} fontWeight={'400'} color={'#9EA1A8'}>
          {currentStage} / {totalStage}
        </Text>
      </Center>
      <Center>{children}</Center>
    </VStack>
  );
}

export default StageTextBox;
