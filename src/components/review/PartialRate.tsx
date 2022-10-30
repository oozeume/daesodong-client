import {Box, HStack, Text} from 'native-base';
import React from 'react';
import StarFillIcon from '../../assets/icons/star_fill.svg';

interface Props {
  title: string;
  rate: number;
}

function PartialRate({title, rate}: Props) {
  return (
    <HStack justifyContent={'center'} space={'10px'} alignItems={'center'}>
      <Text color={'grayScale.50'}>{title}</Text>
      <Box
        w={'104px'}
        h={'4px'}
        backgroundColor={'grayScale.20'}
        borderRadius={'100px'}>
        <Box
          w={'80%'}
          h={'100%'}
          backgroundColor={'grayScale.40'}
          borderRadius={'100px'}
        />
      </Box>
      <StarFillIcon color={'#C6C8CD'} />
      <Text color={'#9EA1A8'}>{rate}</Text>
    </HStack>
  );
}

export default PartialRate;
