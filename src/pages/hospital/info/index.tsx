import React from 'react';
import {Center, Divider, Image, ScrollView, VStack} from 'native-base';
import Swiper from 'react-native-swiper';

import VisitedAnimals from '../../../components/hospital/info/VisitedAnimals';
import RecordVisitedExperience from '../../../components/hospital/info/RecordVisitedExperience';

// 임시 사진 리스트 및 타입 생성
type ImageListType = {uri: string};

const TMP_IMAGE_LIST: ImageListType[] = [
  {uri: 'https://wallpaperaccess.com/full/317501.jpg'},
  {uri: 'https://www.w3schools.com/css/img_lights.jpg'},
];
//

const HospitalReview = () => {
  return (
    <VStack space={7} alignItems="center" backgroundColor={'#FFFFFF'}>
      <ScrollView w={'100%'} h={'65%'}>
        {/* 병원 사진 */}
        <Center w="375" h="250" backgroundColor={'#ECECEE'}>
          <Swiper
            dotColor="rgba(26, 30, 39, 0.6)"
            activeDotColor="#FF6B00"
            loop={false}>
            {TMP_IMAGE_LIST.map(image => (
              <Image
                key={image.uri}
                source={{uri: image.uri}}
                width={375}
                height={250}
                alt=""
              />
            ))}
          </Swiper>
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
