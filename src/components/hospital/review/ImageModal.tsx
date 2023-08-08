import React, {useRef, useState} from 'react';
import {AspectRatio, Box, HStack, Image, Modal, Text} from 'native-base';
import {Pressable} from 'react-native';

import PaginationButtonLeftIcon from '~/assets/icons/pagination_btn_left.svg';
import PaginationButtonRightIcon from '~/assets/icons/pagination_btn_right.svg';
import Swiper from 'react-native-web-swiper';
import {config} from '~/utils/config';
import {APP_WIDTH} from '~/utils/dimension';

const MARGIN_X = 18;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
}

/**
 *@description 시설 리뷰 > 이미지 모달
 */

function ImageModal({images, isOpen, onClose, currentIndex}: Props) {
  const ref = useRef<any>();
  const [index, setIndex] = useState(currentIndex + 1);
  const [imageWidth, setImageWidth] = useState(0);

  const onPrev = () => {
    ref.current?.goToPrev();
  };

  const onNext = () => {
    ref.current?.goToNext();
  };

  const _onClose = () => {
    ref.current?.goTo(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      w={APP_WIDTH}
      h={'100%'}
      onClose={_onClose}
      backgroundColor={'rgba(26, 30, 39, 0.6)'}
      size={'xl'}>
      <Modal.Content
        borderRadius={0}
        width={APP_WIDTH - MARGIN_X * 2}
        position={'relative'}
        onLayout={e => setImageWidth(e.nativeEvent.layout.width)}>
        <AspectRatio ratio={1 / 1}>
          <Swiper
            ref={ref}
            onIndexChanged={i => setIndex(i + 1)}
            from={currentIndex}
            controlsEnabled={false}
            containerStyle={{
              width: APP_WIDTH - MARGIN_X * 2,
              height: APP_WIDTH - MARGIN_X * 2,
            }}>
            {images.map((i, _index) => (
              <Image
                width={APP_WIDTH - MARGIN_X * 2}
                height={APP_WIDTH - MARGIN_X * 2}
                key={i}
                alt={i}
                source={{
                  uri: `${config.IMAGE_BASE_URL}${i}`,
                }}
              />
            ))}
          </Swiper>
        </AspectRatio>

        <HStack
          w={imageWidth - MARGIN_X * 2}
          h={'100%'}
          position={'absolute'}
          top={0}
          left={18}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <PaginationButtonLeftIcon onPress={onPrev} />
          <PaginationButtonRightIcon onPress={onNext} />
        </HStack>
      </Modal.Content>

      <Modal.Footer
        position={'absolute'}
        bottom={0}
        backgroundColor={'grayScale.90'}
        w={'100%'}
        h={'92px'}>
        <HStack w={'100%'} justifyContent={'center'}>
          <Text fontSize={'15px'} color={'white'}>
            {index}/{images.length}
          </Text>
        </HStack>
        <Box position={'absolute'} top={'15px'} right={'18px'}>
          <Pressable onPress={_onClose}>
            <Text color={'white'}>닫기</Text>
          </Pressable>
        </Box>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;
