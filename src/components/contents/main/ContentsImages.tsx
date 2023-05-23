import {Box, Circle, Image} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import Swiper from 'react-native-web-swiper';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  images: string[];
}

/**
 *@description 컨텐츠 이미지 스와이퍼
 */
function ContentsImages({images}: Props) {
  return (
    <Swiper
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
            backgroundColor={isActive ? colors.fussOrange[0] : colors.scrim[60]}
          />
        ),
      }}
      containerStyle={{
        width: APP_WIDTH,
        height: APP_WIDTH,
      }}>
      {images.map(imageUrl => (
        <Image
          key={imageUrl}
          w={'100%'}
          h={'100%'}
          src={imageUrl}
          alt={imageUrl}
          fallbackElement={
            <Box
              width={'100%'}
              height={'100%'}
              bgColor={colors.grayScale[40]}
              mb="24px"
            />
          }
        />
      ))}
    </Swiper>
  );
}

export default ContentsImages;
