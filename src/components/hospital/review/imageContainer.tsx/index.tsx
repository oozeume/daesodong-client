import {Box, Image, Text} from 'native-base';
import React from 'react';
import {Pressable} from 'react-native';
import {config} from '~/utils/config';

interface Props {
  onPress?: () => void;
  visibleMoreImage?: boolean;
  imageUrl: string;
  imagesCount?: number;
  imageSize: number;
}

function ImageContainer({
  imageUrl,
  onPress,
  visibleMoreImage = false,
  imagesCount,
  imageSize,
}: Props) {
  return (
    <Box position={visibleMoreImage ? 'relative' : 'static'}>
      <Pressable onPress={onPress}>
        <Image
          width={imageSize}
          height={imageSize}
          source={{
            uri: `${config.IMAGE_BASE_URL}${imageUrl}`,
          }}
          alt={'image'}
          fallbackElement={
            <Box w={imageSize} h={imageSize} backgroundColor={'grayScale.10'} />
          }
        />

        {visibleMoreImage && imagesCount && (
          <Box
            left={0}
            justifyContent={'center'}
            alignItems={'center'}
            w={imageSize}
            h={imageSize}
            background={'rgba(26, 30, 39, 0.6)'}
            position={'absolute'}>
            <Text fontSize={'14px'} color={'white'}>
              +{imagesCount - 2}
            </Text>
          </Box>
        )}
      </Pressable>
    </Box>
  );
}

export default ImageContainer;
