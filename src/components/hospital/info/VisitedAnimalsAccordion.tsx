import React from 'react';
import {Center, Flex, Text} from 'native-base';

import {VisitedAnimalsType} from '~/../types/hospital';

import styles from './styles';

type VisitedAnimalsAccordionProps = {
  visitedAnimals: VisitedAnimalsType[];
};

/**
 * 병원 시설에 방문한 동물의 종에 따라 몇마리가 방문했는지 보여주는 컴포넌트
 * @param {VisitedAnimalsType[]} visitedAnimals 방문 동물의 종, 총 방문한 동물의 수
 * @TODO API 연동 후 타입 및 데이터 변경
 */

const VisitedAnimalsAccordion = ({
  visitedAnimals,
}: VisitedAnimalsAccordionProps) => {
  return (
    <Center>
      <Flex style={styles.innerBoxWrapper}>
        {visitedAnimals.map((data, index) => (
          <Flex key={`${data.animalType} + ${index}`} style={styles.innerBox}>
            <Text style={styles.text}>{data.animalType}</Text>
            <Text style={styles.text}>{data.visitsNumber}</Text>
          </Flex>
        ))}
      </Flex>
    </Center>
  );
};

export default VisitedAnimalsAccordion;
