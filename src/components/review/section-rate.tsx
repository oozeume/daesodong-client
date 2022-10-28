import {Box, HStack, Text} from 'native-base';
import React, {FunctionComponent} from 'react';
import StarFillIcon from '../../assets/icons/star_fill.svg';

const SectionRate: FunctionComponent<{title: string; rate: number}> = ({
  title,
  rate,
}) => {
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
};

export default SectionRate;
