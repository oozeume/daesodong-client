import React from 'react';
import {Center, Divider, Image, ScrollView, VStack} from 'native-base';

import VisitedAnimals from '../../../components/hospital/info/VisitedAnimals';
import RecordVisitedExperience from '../../../components/hospital/info/RecordVisitedExperience';

const HospitalReview = () => {
  return (
    <VStack space={7} alignItems="center" backgroundColor={'#FFFFFF'}>
      <ScrollView w={'100%'} h={'65%'}>
        {/* 병원 사진 */}
        <Center w="375" h="250" backgroundColor={'#ECECEE'}>
          <Image width={375} height={250} alt="" />
        </Center>
        {/* 병원 방문 기록 */}
        <Center>
          <RecordVisitedExperience />
          <VisitedAnimals />
          <Divider
            my="2"
            style={[{marginTop: 24}]}
            _light={{
              bg: 'muted.100',
            }}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
};

export default HospitalReview;
