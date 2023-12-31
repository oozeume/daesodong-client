import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable} from 'react-native';
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
  useDisclose,
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
import ChatFillIcon from '~/assets/icons/chat_fill.svg';
import ClockFillIcon from '~/assets/icons/clock_fill.svg';
import ExclamationMarkFillIcon from '~/assets/icons/exclamationMark_fill.svg';
import CallFillIcon from '~/assets/icons/call_fill.svg';
import LocationFillIcon from '~/assets/icons/location_fill.svg';
import {useGetFacilityInfo} from '~/api/facility/queries';
import Facility from '~/model/facility';
import FacilityInfoFooter from '~/components/hospital/info/HospitalInfoFooter';
import WebView from 'react-native-webview';
import {imageHeight} from '~/utils/imageHeight';
import {APP_WIDTH} from '~/utils/dimension';
import ImageModal from '~/components/hospital/review/ImageModal';

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
  const swiperRef = useRef<any>(null);

  const {data, isLoading, refetch} = useGetFacilityInfo(id);
  const {
    isOpen: isImageModalOpen,
    onOpen: imageModalOpen,
    onClose: onImageModalClose,
  } = useDisclose();

  const handleIntroOpen = () => setTextOpen(prev => !prev);

  const onMoveMap = useCallback(
    (coordinates: {latitude: number; longitude: number}) => {
      mapRef.current?.postMessage(
        JSON.stringify({
          success: true,
          type: 'move',
          isDebug: true,
          data: coordinates,
        }),
      );
    },
    [mapRef],
  );

  useEffect(() => {
    if (data) {
      setFacilityInfo(new Facility(data.data));
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isImageModalOpen && (
        <ImageModal
          images={facilityInfo?.images ?? []}
          isOpen={isImageModalOpen}
          onClose={onImageModalClose}
          currentIndex={swiperRef.current?.state.index ?? 0}
        />
      )}

      {facilityInfo && (
        <Stack flex={1}>
          <VStack alignItems="center" flex={1} backgroundColor={'white'}>
            <ScrollView>
              {/* TODO: 이미지 스와이퍼 공통 모듈로 리팩토링 */}
              <Swiper
                ref={swiperRef}
                style={{backgroundColor: colors.grayScale[20]}}
                height={imageHeight(IMAGE_RATIO, APP_WIDTH)}
                dotColor={colors.scrim[60]}
                activeDotColor={colors.fussOrange[0]}
                loop={false}>
                {facilityInfo.images.map(image => (
                  <AspectRatio key={image} ratio={IMAGE_RATIO}>
                    <Pressable onPress={imageModalOpen}>
                      <Image
                        source={{uri: image}}
                        height={imageHeight(IMAGE_RATIO, APP_WIDTH)}
                        alt={image}
                      />
                    </Pressable>
                  </AspectRatio>
                ))}
              </Swiper>

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
              <HospitalInfoContents icon={<ChatFillIcon />}>
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
              <HospitalInfoContents icon={<ClockFillIcon />}>
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
              <HospitalInfoContents icon={<CallFillIcon />}>
                <Text
                  fontSize={14}
                  textAlign={'left'}
                  color={colors.grayScale[70]}
                  textDecoration={'solid'}>
                  {facilityInfo.phoneNumber}
                </Text>
              </HospitalInfoContents>

              {/* 시설 정보 */}
              <HospitalInfoContents icon={<ExclamationMarkFillIcon />}>
                <Text
                  fontSize={14}
                  fontWeight={'400'}
                  color={colors.grayScale[70]}
                  textAlign={'left'}>
                  {data?.data.info}
                </Text>
              </HospitalInfoContents>

              {/* 시설 주소 */}
              <HospitalInfoContents icon={<LocationFillIcon />}>
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

          <FacilityInfoFooter facility={facilityInfo} refetch={refetch} />
        </Stack>
      )}
    </>
  );
}

export default FacilityInfo;
