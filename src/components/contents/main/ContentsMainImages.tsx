import {Box, Circle} from 'native-base';
import React, {useRef} from 'react';
import {colors} from '~/theme/theme';
import Swiper from 'react-native-web-swiper';
import {APP_WIDTH} from '~/utils/dimension';

/**
 *@description 컨텐츠 메인 페이지 상단 (이미지)
 */
function ContentsMainImages() {
  return (
    <Box>
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
              backgroundColor={
                isActive ? colors.fussOrange[0] : colors.scrim[60]
              }
            />
          ),
        }}
        containerStyle={{
          width: APP_WIDTH,
          height: APP_WIDTH,
        }}>
        <Box
          width={'100%'}
          height={'100%'}
          bgColor={colors.grayScale[40]}
          mb="24px"
        />
      </Swiper>
    </Box>
  );
}

export default ContentsMainImages;
