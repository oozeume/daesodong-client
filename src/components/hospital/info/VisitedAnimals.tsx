import React, {useCallback, useMemo, useState} from 'react';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {colors} from '~/theme/theme';
import VisitedAnimalsAccordion from './VisitedAnimalsAccordion';
import UpIcon from '~/assets/icon/up.svg';
import DownIcon from '~/assets/icon/down.svg';
import {useGetVisitedPetsFacility} from '~/api/facility/queries';
import Species from '~/model/species';
import _ from 'lodash';
import {APP_WIDTH} from '~/utils/dimension';
import {MARGIN_X} from '~/constants/facility/detail';
import {useGetSpecies} from '~/api/species/queries';

interface Props {
  facilityId: string;
}

/**
 *@description 병원 시설에 방문한 동물의 수를 보여주는 컴포넌트
 */

function VisitedAnimals({facilityId}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {data: visitedSpeciesData, isLoading} =
    useGetVisitedPetsFacility(facilityId);
  const {data: speciesData} = useGetSpecies({limit: 10}, true);

  const handleOpen = () => setIsOpen(prev => !prev);

  const species = speciesData?.data.map(i => new Species(i)) ?? [];
  const visitedSpecies = useMemo(() => {
    return visitedSpeciesData?.data.map(d => new Species(d)) ?? [];
  }, [visitedSpeciesData]);

  const visitedSpeciesCount = useMemo(() => {
    const a = visitedSpecies.map(i => i.count);
    return _.sum(a);
  }, [visitedSpecies]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Pressable onPress={handleOpen} flex={1}>
      <Box
        flex={1}
        width={APP_WIDTH - MARGIN_X * 2}
        py={'16px'}
        mt={'12px'}
        borderRadius={8}
        backgroundColor={colors.grayScale[10]}>
        <VStack>
          <HStack space={2} justifyContent="center">
            <Text
              fontSize={14}
              fontWeight={'500'}
              color={colors.grayScale[80]}
              textAlign={'center'}>
              {visitedSpeciesCount}마리의 친구들이 방문했어요
            </Text>
            <Center>{isOpen ? <UpIcon /> : <DownIcon />}</Center>
          </HStack>

          {isOpen && (
            <VisitedAnimalsAccordion
              visitedAnimals={visitedSpecies}
              allSpecies={species}
            />
          )}
        </VStack>
      </Box>
    </Pressable>
  );
}

export default VisitedAnimals;
