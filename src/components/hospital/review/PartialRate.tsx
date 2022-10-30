import React from 'react';
import {Box, HStack, Text} from 'native-base';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import {Platform} from 'react-native';

interface Props {
  title: string;
  rate: number;
}

/**
 *@description 병원 리뷰 평점 요약 - 부분 평점
 */

function PartialRate({title, rate}: Props) {
  return (
    <HStack justifyContent={'center'} alignItems={'center'}>
      <Text color={'grayScale.50'} fontSize={'12px'} pr={'10px'}>
        {title}
      </Text>
      <Box
        w={Platform.OS === 'ios' ? '104px' : 20}
        h={'4px'}
        backgroundColor={'grayScale.20'}
        mr={'10px'}
        borderRadius={'100px'}>
        <Box
          w={'80%'}
          h={'100%'}
          backgroundColor={'grayScale.40'}
          borderRadius={'100px'}
        />
      </Box>
      <StarFillIcon fill={'#C6C8CD'} stroke={'#C6C8CD'} />
      <Text pl={'10px'} color={'#9EA1A8'} fontSize={'12px'}>
        {rate}
      </Text>
    </HStack>
  );
}

export default PartialRate;
