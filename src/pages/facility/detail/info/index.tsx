import React, {useEffect, useRef, useState} from 'react';
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
import {useGetFacilityInfo} from '~/api/facility/queries';
import Facility from '~/model/facility';
import FacilityInfoFooter from '~/components/hospital/info/HospitalInfoFooter';
import WebView from 'react-native-webview';
import {imageHeight} from '~/utils/imageHeight';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  id: string;
}

const IMAGE_RATIO = 375 / 250;

/**
 * 시설 정보 탭
 */

function FacilityInfo({id}: Props) {
  const [textOpen, setTextOpen] = useState(false);
  const [facilityInfo, setFacilityInfo] = useState<Facility>();

  const mapRef = useRef<WebView | null>(null);

  const {data, isLoading} = useGetFacilityInfo(id);

  const handleIntroOpen = () => setTextOpen(prev => !prev);

  const onMoveMap = (coordinates: {latitude: number; longitude: number}) => {
    mapRef.current?.postMessage(
      JSON.stringify({
        success: true,
        type: 'move',
        isDebug: true,
        data: coordinates,
      }),
    );
  };

  useEffect(() => {
    if (data) {
      console.log('썡데이터 확인하기---->', data.data);
      setFacilityInfo(new Facility(data.data as any));
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {facilityInfo && (
        <Stack flex={1}>
          <VStack alignItems="center" flex={1} backgroundColor={'white'}>
            <ScrollView>
              <Center backgroundColor={colors.grayScale[20]}>
                <Swiper
                  height={imageHeight(IMAGE_RATIO, APP_WIDTH)}
                  dotColor={colors.scrim[60]}
                  activeDotColor={colors.fussOrange[0]}
                  loop={false}>
                  {facilityInfo.images.map(image => (
                    <AspectRatio key={image} ratio={IMAGE_RATIO}>
                      <Image
                        source={{uri: image}}
                        height={imageHeight(IMAGE_RATIO, APP_WIDTH)}
                        alt={image}
                      />
                    </AspectRatio>
                  ))}
                </Swiper>
              </Center>

              {/* 시설 방문 기록 */}
              <Center flex={1}>
                <RecordVisitedExperience facilityId={id} />
                <VisitedAnimals facilityId={id} />
                <Divider
                  my="2"
                  style={[{marginTop: 24}]}
                  _light={{
                    bg: 'muted.100',
                  }}
                />
              </Center>

              {/* 시설 인사말 */}
              <HospitalInfoContents iconName="chat_fill">
                <VStack flex={1} space={3}>
                  <TextEllipsis
                    text={facilityInfo.intro}
                    textAlign={'left'}
                    numberOfLines={textOpen ? 0 : 3}
                  />
                  {facilityInfo.intro.length > 87 && (
                    <Pressable onPress={handleIntroOpen}>
                      <HStack space={1}>
                        <Text
                          style={{fontSize: 13, color: colors.grayScale[60]}}>
                          {textOpen ? '닫기' : '전체보기'}
                        </Text>
                        <Center>
                          {textOpen ? <ArrowDownIcon /> : <ArrowDownIcon />}
                        </Center>
                      </HStack>
                    </Pressable>
                  )}
                </VStack>
              </HospitalInfoContents>

              {/* 시설 영업 시간 */}
              <HospitalInfoContents iconName="clock_fill">
                <VStack space={4} flex={1}>
                  {facilityInfo.openingHours.map(openingHours => (
                    <HospitalOpeningHours
                      key={openingHours.date}
                      openingHours={openingHours}
                    />
                  ))}
                </VStack>
              </HospitalInfoContents>

              {/* 시설 전화번호 */}
              <HospitalInfoContents iconName="call_fill">
                <Pressable
                  onPress={() => {
                    Linking.openURL('tel:02-305-4242');
                  }}>
                  <Text
                    fontSize={13}
                    textAlign={'left'}
                    color={colors.positive[0]}
                    textDecoration={'solid'}
                    textDecorationLine={'underline'}
                    textDecorationColor={colors.positive[0]}>
                    {facilityInfo.phoneNumber}
                  </Text>
                </Pressable>
              </HospitalInfoContents>

              {/* 시설 정보 */}
              <HospitalInfoContents iconName="info_fill">
                <Text
                  fontSize={14}
                  fontWeight={'400'}
                  color={colors.grayScale[70]}
                  textAlign={'left'}>
                  {data?.data.info}
                </Text>
              </HospitalInfoContents>

              {/* 시설 주소 */}
              <HospitalInfoContents iconName="location_fill">
                <VStack flex={1}>
                  <Text
                    fontSize={14}
                    fontWeight={'400'}
                    color={colors.grayScale[70]}
                    textAlign={'left'}>
                    {facilityInfo.address}
                  </Text>
                  <Box
                    flex={1}
                    h={200}
                    mt={'12px'}
                    background={colors.grayScale[10]}>
                    <WebView
                      scrollEnabled={false}
                      ref={mapRef}
                      source={{
                        uri: 'http://daesodong-map.s3-website.us-east-2.amazonaws.com/',
                      }}
                      onLoadEnd={() => {
                        onMoveMap({
                          latitude: facilityInfo.latitude,
                          longitude: facilityInfo.longitude,
                        });
                      }}
                    />
                  </Box>
                </VStack>
              </HospitalInfoContents>
            </ScrollView>
          </VStack>

          <FacilityInfoFooter facility={facilityInfo} />
        </Stack>
      )}
    </>
  );
}

export default FacilityInfo;
