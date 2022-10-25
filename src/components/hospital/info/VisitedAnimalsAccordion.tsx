import React from 'react';
import {Center, Flex, Text} from 'native-base';

import {VisitedAnimalsType} from './VisitedAnimals';

import styles from './styles';

type VisitedAnimalsAccordionProps = {
  visitedAnimals: VisitedAnimalsType[];
};

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
