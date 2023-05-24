import {Box, Circle, Image} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import Swiper from 'react-native-web-swiper';
import {APP_WIDTH} from '~/utils/dimension';
import Content from '~/model/content';
import {useGetMainContents} from '~/api/contents/queries';
import {CONTENTS_PER_PAGE} from '~/constants/contents';

/**
 *@description 컨텐츠 메인 페이지 상단 (이미지)
 */
function ContentsMainImages() {
  const {data} = useGetMainContents({skip: 0, take: CONTENTS_PER_PAGE});

  const contents = data?.data.map(c => new Content(c)) ?? [];

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
        {contents.map(i => (
          <Image
            w={'100%'}
            h={'100%'}
            src={i.representiveImage}
            alt={i.id}
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
    </Box>
  );
}

export default ContentsMainImages;
