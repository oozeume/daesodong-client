import React, {useState} from 'react';
import {Box, Center, HStack, Pressable, Text, VStack} from 'native-base';

import styles from './styles';

import VisitedAnimalsAccordion from './VisitedAnimalsAccordion';

import UpIcon from '../../../assets/icon/up.svg';
import DownIcon from '../../../assets/icon/down.svg';

// 타입 및 데이터
export type VisitedAnimalsType = {animalType: string; visitsNumber: number};

const TMP_DATA: VisitedAnimalsType[] = [
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
  {animalType: '햄스터', visitsNumber: 12},
];
//

const RecordVisitedAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 총 방문 동물 숫자 카운팅
  const totalVisitsNumber = TMP_DATA.reduce(
    (total, data) => total + data.visitsNumber,
    0,
  );

  // 아코디언 박스 open 핸들러
  const handleOpen = () => setIsOpen(prev => !prev);

  return (
    <Box style={[styles.visitHistoryBox]}>
      <VStack>
        <HStack space={2} justifyContent="center">
          <Text style={[styles.text, styles.hilightText]}>
            {totalVisitsNumber}마리의 친구들이 방문했어요
          </Text>
          <Center>
            <Pressable onPress={handleOpen}>
              {isOpen ? <UpIcon /> : <DownIcon />}
            </Pressable>
          </Center>
        </HStack>
        {/* 아코디언 박스 */}
        {isOpen && <VisitedAnimalsAccordion visitedAnimals={TMP_DATA} />}
      </VStack>
    </Box>
  );
};

export default RecordVisitedAccordion;
