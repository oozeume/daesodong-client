import {HStack, Text} from 'native-base';
import React from 'react';
import StarFillIcon from '../../../assets/icons/star_fill.svg';

interface Props {
  title: string;
}

function StarRate({title}: Props) {
  return (
    <HStack alignItems={'center'}>
      <Text w={'34px'} color={'grayScale.60'} fontSize={'13px'}>
        {title}
      </Text>
      <StarFillIcon color={'#FFCC16'} />
      <StarFillIcon color={'#FFCC16'} />
      <StarFillIcon color={'#FFCC16'} />
      <StarFillIcon color={'#FFCC16'} />
      <StarFillIcon color={'#FFCC16'} />
    </HStack>
  );
}

export default StarRate;
