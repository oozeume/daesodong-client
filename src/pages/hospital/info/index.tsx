import React, {useMemo, useState} from 'react';
import {Linking, Pressable} from 'react-native';
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base';
import Swiper from 'react-native-swiper';
import {colors} from '~/theme/theme';
import TextEllipsis from '~/components/common/TextEllipsis';
import VisitedAnimals from '~/components/hospital/info/VisitedAnimals';
import HospitalInfoContents from '~/components/hospital/info/HospitalInfoContents';
import HospitalOpeningHours from '~/components/hospital/info/HospitalOpeningHours';
import RecordVisitedExperience from '~/components/hospital/info/RecordVisitedExperience';
import ArrowDownIcon from '~/assets/icon/_down.svg';
import { useGetFacilityInfo } from '~/api/facility/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '~/../types/navigator';

type Props = NativeStackScreenProps<RootTabParamList, 'Facility'>;

/**
 * 병원 시설 정보 탭
 *
 */

function HospitalInfo({route}: Props) {
  const {facilityId} = route.params;
  const [textOpen, setTextOpen] = useState(false);

  const {data, isLoading} = useGetFacilityInfo(facilityId);

  const OPENING_HOURS = useMemo(() => {
      if(data) {
        return [
          {date: '월 - 금', totalHour: data?.data.sch_mon, break: undefined},
          {date: '토', totalHour: data.data.sch_sat, break: undefined},
          {date: '일', totalHour: data.data.sch_sun, break: undefined},
          {date: '공휴일', totalHour: data.data.sch_holy, break: undefined},
        ]
      }
  }, [data])

  const handleTextOpen = () => setTextOpen(prev => !prev);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <Stack style={{flex: 1}}>
      <VStack alignItems="center" 
      flex={1}
      backgroundColor={'white'}
      >
        {data && <ScrollView>
          <Center  h="250" backgroundColor={colors.grayScale[20]}>
            <Swiper
              dotColor={colors.scrim[60]}
              activeDotColor={colors.fussOrange[0]}
              loop={false}>
              {data.data.hospital_picture.map(image => (
                <AspectRatio key={image.picture_url} ratio={375 / 250}>
                  <Image
                    source={{uri: image.picture_url}}
                    width={375}
                    height={250}
                    alt={image.picture_url}
                  />
                </AspectRatio>
              ))}
            </Swiper>
          </Center>

          {/* 병원 방문 기록 */}
          <Center>
            <RecordVisitedExperience facilityId={facilityId} />
            <VisitedAnimals facilityId={facilityId}/>
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
                text={data.data.intro}
                width={299}
                textAlign={'left'}
                numberOfLines={textOpen ? 0 : 3}
              />
              {data.data.intro.length > 87 && (
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
              {OPENING_HOURS?.map(openingHours => (
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
                {data.data.phone}
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
              {data?.data.info}
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
                {data?.data.address1}
                {data?.data.address2}
              </Text>
              <Box
                w={299}
                h={200}
                mt={'12px'}
                background={colors.grayScale[10]}
              />
            </VStack>
          </HospitalInfoContents>
        </ScrollView>}
      </VStack>
    </Stack>
  );
}

export default HospitalInfo;
