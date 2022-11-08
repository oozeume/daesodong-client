import React, {useState} from 'react';
import {Linking, Pressable} from 'react-native';
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import Swiper from 'react-native-swiper';

import {colors} from '~/theme/theme';
import TextEllipsis from '../../../components/common/TextEllipsis';
import VisitedAnimals from '../../../components/hospital/info/VisitedAnimals';
import HospitalInfoContents from '../../../components/hospital/info/HospitalInfoContents';
import HospitalOpeningHours from '../../../components/hospital/info/HospitalOpeningHours';
import RecordVisitedExperience from '../../../components/hospital/info/RecordVisitedExperience';

import ArrowDownIcon from '../../../assets/icon/_down.svg';

// 임시 타입 생성 및 mock data
type ImageListType = {uri: string};

export type OpeningHoursType = {
  date: string;
  totalHour: string;
  break: string | undefined;
};

const IMAGE_LIST: ImageListType[] = [
  {uri: 'https://wallpaperaccess.com/full/317501.jpg'},
  {uri: 'https://www.w3schools.com/css/img_lights.jpg'},
];

const OPENING_HOURS: OpeningHoursType[] = [
  {date: '월 - 금', totalHour: '10:00 ~ 19:00', break: '12:30 ~ 14:00'},
  {date: '토', totalHour: '10:00 ~ 17:00', break: '12:30 ~ 14:00'},
  {date: '일', totalHour: '정기휴무', break: undefined},
  {date: '공휴일', totalHour: '휴무', break: undefined},
];
//

// 임시 인사말 변수
const hospitalGreetings = `어울림 동물병원 대표원장 김용석입니다. 수의사의 역할은 반려인과 반려동물이 오랜시간 조화롭게 살도록 하는 것에 있다고 생각합니다. 그 역할을 잘 수행하기 위해`;

/**
 * 병원 시설 정보 탭
 */

function HospitalInfo() {
  const [textOpen, setTextOpen] = useState(false);

  const handleTextOpen = () => setTextOpen(prev => !prev);

  return (
    <VStack alignItems="center" backgroundColor={colors.grayScale[0]}>
      <ScrollView w={'100%'} h={'65%'}>
        {/* 병원 사진 */}
        {/* 이미지 클릭 시 자세히 보기 모달 추가 예정 */}
        <Center w="375" h="250" backgroundColor={colors.grayScale[20]}>
          <Swiper
            dotColor={colors.scrim[60]}
            activeDotColor={colors.fussOrange[0]}
            loop={false}>
            {IMAGE_LIST.map(image => (
              <AspectRatio key={image.uri} ratio={375 / 250}>
                <Image
                  source={{uri: image.uri}}
                  width={375}
                  height={250}
                  alt=""
                />
              </AspectRatio>
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

        {/* 병원 인사말 */}
        <HospitalInfoContents iconName="chat_fill">
          <VStack space={3}>
            <TextEllipsis
              text={hospitalGreetings}
              width={299}
              textAlign={'left'}
              numberOfLines={textOpen ? 0 : 3}
            />
            {hospitalGreetings.length > 87 && (
              <Pressable onPress={handleTextOpen}>
                <HStack space={1}>
                  <Text style={{fontSize: 13, color: colors.grayScale[60]}}>
                    {textOpen ? '닫기' : '전체보기'}
                  </Text>
                  {/* Up 아이콘 추가 예정 */}
                  <Center>
                    {textOpen ? <ArrowDownIcon /> : <ArrowDownIcon />}
                  </Center>
                </HStack>
              </Pressable>
            )}
          </VStack>
        </HospitalInfoContents>

        {/* 병원 영업 시간 */}
        <HospitalInfoContents iconName="clock_fill">
          <VStack space={4} width={229}>
            {OPENING_HOURS.map(openingHours => (
              <HospitalOpeningHours
                key={openingHours.date}
                openingHours={openingHours}
              />
            ))}
          </VStack>
        </HospitalInfoContents>

        {/* 병원 전화번호 */}
        <HospitalInfoContents iconName="call_fill">
          <Pressable
            onPress={() => {
              Linking.openURL('tel:02-305-4242');
            }}>
            <Text
              w={299}
              fontSize={13}
              textAlign={'left'}
              color={colors.positive[0]}
              textDecoration={'solid'}
              textDecorationLine={'underline'}
              textDecorationColor={colors.positive[0]}>
              02-305-4242
            </Text>
          </Pressable>
        </HospitalInfoContents>

        {/* 병원 정보 */}
        <HospitalInfoContents iconName="info_fill">
          <Text
            w={299}
            fontSize={14}
            fontWeight={'400'}
            color={colors.grayScale[70]}
            textAlign={'left'}>
            첫 방문 시 예약이 불가합니다.
          </Text>
        </HospitalInfoContents>

        {/* 병원 주소 */}
        {/* Box위치에 지도 API 추가 예정 */}
        <HospitalInfoContents iconName="location_fill">
          <VStack>
            <Text
              w={299}
              fontSize={14}
              fontWeight={'400'}
              color={colors.grayScale[70]}
              textAlign={'left'}>
              서울 서대문구 남가좌동 385 DMC 파크뷰자이 104동 1층 102A호
            </Text>
            <Box
              w={299}
              h={200}
              mt={'12px'}
              background={colors.grayScale[10]}
            />
          </VStack>
        </HospitalInfoContents>
      </ScrollView>
    </VStack>
  );
}

export default HospitalInfo;
