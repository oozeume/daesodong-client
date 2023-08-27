import React, {useEffect, useRef} from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import IntroImage1 from '~/assets/images/init_intro1.svg';
import IntroImage2 from '~/assets/images/init_intro2.svg';
import IntroImage3 from '~/assets/images/init_intro3.svg';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import Swiper from 'react-native-web-swiper';
import {Box, Circle, Text, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

/**
 *@description 초기 앱 인트로 설명 페이지
 */
function AppIntro() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const swiperRef = useRef<Swiper | null>(null);

  const onMove = () => {
    navigate('InitialLogin');
  };

  const images = [
    {
      image: <IntroImage1 />,
      title: '특수동물 진료 병원을 찾고 계신가요?',
      description:
        '내 반려동물을 진료해주는\n우리집에서 가장 가까운 병원을 알려드릴게요',
    },
    {
      image: <IntroImage2 />,
      title: '유용한 정보를 얻을 수 있어요',
      description: '정보 얻기가 힘든 특수동물의 모든 것\n대소동에서 알려드려요',
    },
    {
      image: <IntroImage3 />,
      title: '내 경험을 공유해보세요',
      description:
        '내가 겪은 경험을 공유하고 다른 동물들을 도와\n고마운 마음을 모아보세요',
    },
  ];

  const SWIPER_HEIGHT = 108;

  useEffect(() => {
    const swiperTimeout = setInterval(() => {
      if (swiperRef.current) swiperRef.current.goToNext();
    }, 4000);

    setTimeout(() => {
      clearInterval(swiperTimeout);
    }, 9000);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale['0']}}>
      <Box
        bg={colors.grayScale['0']}
        h="100%"
        pb={'40px'}
        px="18px"
        justifyContent={'space-between'}>
        <Box
          width={'100%'}
          height={APP_WIDTH}
          pt={'78px'}
          h={APP_HEIGHT - SWIPER_HEIGHT}>
          <Swiper
            ref={swiperRef}
            controlsProps={{
              nextTitle: '',
              prevTitle: '',
              dotsWrapperStyle: {
                marginBottom: 20,
              },
              DotComponent: ({isActive}) => (
                <Circle
                  width={'6px'}
                  margin={'3px'}
                  height={'6px'}
                  backgroundColor={
                    isActive ? colors.fussOrange[0] : colors.scrim[60]
                  }
                />
              ),
            }}>
            {images.map((item, i) => (
              <React.Fragment key={i.toString()}>
                <VStack justifyContent={'space-between'} height={'100%'}>
                  <VStack>
                    <Text
                      textAlign="center"
                      fontSize={'20px'}
                      fontWeight={'bold'}
                      mb="12px">
                      {item.title}
                    </Text>

                    <Text textAlign="center" fontSize="15px">
                      {item.description}
                    </Text>
                  </VStack>

                  <VStack alignItems={'center'}>{item.image}</VStack>

                  <VStack></VStack>
                </VStack>
              </React.Fragment>
            ))}
          </Swiper>
        </Box>

        <Box>
          <RedActiveLargeButton
            active={true}
            text={'함께하기'}
            handlePress={onMove}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default AppIntro;
