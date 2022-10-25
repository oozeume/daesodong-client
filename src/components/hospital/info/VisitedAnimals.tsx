import React, {useState} from 'react';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';

import styles from './styles';

import MateriallConsIcon from 'react-native-vector-icons/MaterialIcons';
import VisitedAnimalsAccordion from './VisitedAnimalsAccordion';

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
          <Pressable onPress={handleOpen}>
            <MateriallConsIcon
              name={`keyboard-arrow-${isOpen ? 'up' : 'down'}`}
              size={22}
            />
          </Pressable>
        </HStack>
        {/* 아코디언 박스 */}
        {isOpen && <VisitedAnimalsAccordion visitedAnimals={TMP_DATA} />}
      </VStack>
    </Box>
  );
};

export default RecordVisitedAccordion;
