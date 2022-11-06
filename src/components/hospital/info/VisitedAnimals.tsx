import React, {useState} from 'react';
import {Box, Center, HStack, Pressable, Text, VStack} from 'native-base';

import {theme} from '~/theme/theme';
import {VisitedAnimalsType} from '~/../types/hospital';
import VisitedAnimalsAccordion from './VisitedAnimalsAccordion';

import UpIcon from '../../../assets/icon/up.svg';
import DownIcon from '../../../assets/icon/down.svg';

// 타입 및 데이터
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

/**
 * 병원 시설에 방문한 동물의 수를 보여주는 컴포넌트
 * @ 상세정보 확인을 위해 아코디언(접고, 펼치기) 기능이 있음
 * @TODO API 연동 후 이벤트 핸들링 및 타입 및 데이터 변경
 */

function RecordVisitedAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  // 총 방문 동물 숫자 카운팅
  const totalVisitsNumber = TMP_DATA.reduce(
    (total, data) => total + data.visitsNumber,
    0,
  );

  // 아코디언 박스 open 핸들러
  const handleOpen = () => setIsOpen(prev => !prev);

  return (
    <Pressable onPress={handleOpen}>
      <Box
        w={339}
        px={'12px'}
        py={'16px'}
        mt={'12px'}
        borderRadius={8}
        backgroundColor={theme.colors.grayScale[10]}>
        <VStack>
          <HStack space={2} justifyContent="center">
            <Text
              fontSize={14}
              fontWeight={'500'}
              color={theme.colors.grayScale[80]}
              textAlign={'center'}>
              {totalVisitsNumber}마리의 친구들이 방문했어요
            </Text>
            <Center>{isOpen ? <UpIcon /> : <DownIcon />}</Center>
          </HStack>
          {/* 아코디언 박스 */}
          {isOpen && <VisitedAnimalsAccordion visitedAnimals={TMP_DATA} />}
        </VStack>
      </Box>
    </Pressable>
  );
}

export default RecordVisitedAccordion;
