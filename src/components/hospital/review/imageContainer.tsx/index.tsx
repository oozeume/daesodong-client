import {Box, Image, Text} from 'native-base';
import React from 'react';
import {Platform, Pressable} from 'react-native';
import {config} from '~/utils/config';

interface Props {
  onPress?: () => void;
  visibleMoreImage?: boolean;
  imageUrl: string;
}

function ImageContainer({imageUrl, onPress, visibleMoreImage = false}: Props) {
  return (
    <>
      <Pressable onPress={onPress}>
        <Image
          w={Platform.OS === 'ios' ? '108px' : '100px'}
          h={'108px'}
          source={{
            uri: `${config.IMAGE_BASE_URL}${imageUrl}`,
          }}
          alt={'image'}
          fallbackElement={
            <Box
              w={Platform.OS === 'ios' ? '108px' : '100px'}
              h={'108px'}
              backgroundColor={'grayScale.10'}
            />
          }
        />
        <Box
          w={Platform.OS === 'ios' ? '108px' : '100px'}
          h={'108px'}
          backgroundColor={'grayScale.10'}
        />
      </Pressable>

      {visibleMoreImage && (
        <Box
          right={'0px'}
          top={'16px'}
          justifyContent={'center'}
          alignItems={'center'}
          w={Platform.OS === 'ios' ? '108px' : '100px'}
          h={'108px'}
          background={'rgba(26, 30, 39, 0.6)'}
          position={'absolute'}>
          <Text fontSize={'14px'} color={'white'}>
            +00
          </Text>
        </Box>
      )}
    </>
  );
}

export default ImageContainer;
