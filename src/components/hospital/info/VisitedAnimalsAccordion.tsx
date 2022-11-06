import React from 'react';
import {Center, Flex, Text} from 'native-base';

import {VisitedAnimalsType} from '~/../types/hospital';

interface Props {
  visitedAnimals: VisitedAnimalsType[];
}

/**
 * 병원 시설에 방문한 동물의 종에 따라 몇마리가 방문했는지 보여주는 컴포넌트
 * @param {VisitedAnimalsType[]} visitedAnimals 방문 동물의 종, 총 방문한 동물의 수
 * @TODO API 연동 후 타입 및 데이터 변경
 */

function VisitedAnimalsAccordion({visitedAnimals}: Props) {
  return (
    <Center>
      <Flex
        w={307}
        mt={'12px'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}>
        {visitedAnimals.map((data, index) => (
          <Flex
            key={`${data.animalType} + ${index}`}
            w={'149.5px'}
            h={'40px'}
            px={'16px'}
            py={'11px'}
            mt={'8px'}
            borderRadius={8}
            flexDirection={'row'}
            justifyContent={'space-between'}
            backgroundColor={'#FFFFFF'}>
            <Text
              fontSize={14}
              fontWeight={'400'}
              color={'#5D626D'}
              textAlign={'center'}>
              {data.animalType}
            </Text>
            <Text
              fontSize={14}
              fontWeight={'400'}
              color={'#5D626D'}
              textAlign={'center'}>
              {data.visitsNumber}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Center>
  );
}

export default VisitedAnimalsAccordion;