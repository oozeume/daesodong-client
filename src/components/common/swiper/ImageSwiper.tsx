import React, {useRef, useState} from 'react';
import Swiper from 'react-native-web-swiper';
import SwiperLeft from '~/assets/icons/pagination_btn_left.svg';
import SwiperRight from '~/assets/icons/pagination_btn_right.svg';
import {Dimensions} from 'react-native';
import {Center, Image, Pressable, Text, View} from 'native-base';
import {colors} from '~/theme/theme';
import {config} from '~/utils/config';
import {CommunityContentImage} from '~/../types/community';
import _ from 'lodash';

interface Props {
  list: CommunityContentImage[];
}
function ImageSwiper({list}: Props) {
  const imageWidth = Dimensions.get('screen').width - 36;
  const [index, setIndex] = useState(0);
  const ref = useRef<Swiper | null>(null);

  const onLeftMove = () => {
    if (ref.current) ref.current?.goToPrev();
  };

  const onRightMove = () => {
    if (ref.current) ref.current?.goToNext();
  };

  if (_.isEmpty(list))
    return (
      <Center bgColor={colors.grayScale['10']} w={imageWidth} h={imageWidth} />
    );

  return (
    <Center>
      <Swiper
        ref={ref}
        from={0}
        minDistanceForAction={0.1}
        onIndexChanged={(_index: number) => setIndex(_index)}
        controlsProps={{
          prevPos: 'left',
          nextPos: 'right',
          DotComponent: () => <></>,
        }}
        controlsEnabled={false}
        containerStyle={{
          width: imageWidth,
          height: imageWidth,
        }}>
        {list.map((item, i) => (
          <Image
            key={item.url ?? i.toString()}
            w={imageWidth}
            h={imageWidth}
            fallbackElement={
              <Center
                bgColor={colors.grayScale['10']}
                w={imageWidth}
                h={imageWidth}>
                <Text>{i}</Text>
              </Center>
            }
            alt="post_img"
            source={{
              uri: `${config.IMAGE_BASE_URL}${item.url}`,
            }}
          />
        ))}
      </Swiper>

      <Pressable
        width="34px"
        height="34px"
        position={'absolute'}
        justifyContent={'center'}
        alignItems={'center'}
        left={'12px'}
        onPressIn={onLeftMove}>
        <SwiperLeft fill={'#fff'} />
      </Pressable>

      <Pressable
        width="34px"
        height="34px"
        position={'absolute'}
        justifyContent={'center'}
        alignItems={'center'}
        right={'12px'}
        onPressIn={onRightMove}>
        <SwiperRight fill={'#fff'} />
      </Pressable>

      <View
        position={'absolute'}
        bottom={'12px'}
        bgColor={colors.scrim[35]}
        borderRadius={9}
        paddingX={'8px'}
        paddingY="1px">
        <Text
          fontSize={'11px'}
          color={colors.grayScale[0]}
          fontWeight={500}>{`${index + 1} / ${list.length}`}</Text>
      </View>
    </Center>
  );
}

export default ImageSwiper;
