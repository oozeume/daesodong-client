import React from 'react';
import {HStack, Text} from 'native-base';

import StarFillIcon from '~/assets/icons/star_fill.svg';

interface Props {
  title: string;
}

function StarRate({title}: Props) {
  return (
    <HStack alignItems={'center'}>
      <Text w={'34px'} color={'grayScale.60'} fontSize={'13px'}>
        {title}
      </Text>
      <StarFillIcon fill={'#FFCC16'} stroke={'#FFCC16'} />
      <StarFillIcon fill={'#FFCC16'} stroke={'#FFCC16'} />
      <StarFillIcon fill={'#FFCC16'} stroke={'#FFCC16'} />
      <StarFillIcon fill={'#FFCC16'} stroke={'#FFCC16'} />
      <StarFillIcon fill={'#FFCC16'} stroke={'#FFCC16'} />
    </HStack>
  );
}

export default StarRate;
