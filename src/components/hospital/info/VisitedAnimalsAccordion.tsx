import React from 'react';
import {Center, Flex, Text} from 'native-base';

import {colors} from '~/theme/theme';
import Species from '~/model/species';
import _ from 'lodash';

interface Props {
  visitedAnimals: Species[];
  allSpecies: Species[];
}

/**
 * 병원 시설에 방문한 동물의 종에 따라 몇마리가 방문했는지 보여주는 컴포넌트
 * @param {VisitedAnimalsType[]} visitedAnimals 방문 동물의 종, 총 방문한 동물의 수
 * @TODO API 연동 후 타입 및 데이터 변경
 */

function VisitedAnimalsAccordion({visitedAnimals, allSpecies}: Props) {
  const visitedSpeciesCount = (speciesId: string) => {
    const visitedspecies = visitedAnimals.filter(i => i.id === speciesId);
    return _.isEmpty(visitedspecies) ? 0 : visitedspecies[0].count;
  };

  return (
    <Center>
      <Flex
        w={307}
        mt={'12px'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}>
        {allSpecies.map(pet => (
          <Flex
            key={pet.id}
            w={'149.5px'}
            h={'40px'}
            px={'16px'}
            py={'11px'}
            mt={'8px'}
            borderRadius={8}
            flexDirection={'row'}
            justifyContent={'space-between'}
            backgroundColor={colors.grayScale[0]}>
            <Text
              fontSize={14}
              fontWeight={'400'}
              color={colors.grayScale[70]}
              textAlign={'center'}>
              {pet.name}
            </Text>
            <Text
              fontSize={14}
              fontWeight={'400'}
              color={colors.grayScale[70]}
              textAlign={'center'}>
              {visitedSpeciesCount(pet.id)}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Center>
  );
}

export default VisitedAnimalsAccordion;
