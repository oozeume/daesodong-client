import {Flex, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  name: string;
  bgColor?: string;
  color?: string;
  width?: string;
  height?: string;
}

function Tag({name, bgColor, color, width, height}: Props) {
  return (
    <Flex
      w={width ?? '44px'}
      h={height ?? '20px'}
      borderRadius={'4px'}
      backgroundColor={bgColor ?? colors.grayScale[20]}
      justifyContent={'center'}
      alignItems={'center'}>
      <Text
        color={color ?? colors.grayScale[70]}
        fontSize={'12px'}
        lineHeight={'18px'}>
        {name}
      </Text>
    </Flex>
  );
}

export default Tag;
