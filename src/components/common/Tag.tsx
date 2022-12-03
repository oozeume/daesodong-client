import {Flex, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  name: string;
  bgColor?: string;
  color?: string;
}

function Tag({name, bgColor, color}: Props) {
  return (
    <Flex
      w={'44px'}
      h={'20px'}
      borderRadius={'4px'}
      backgroundColor={bgColor ?? colors.grayScale[20]}
      alignItems={'center'}>
      <Text color={color ?? colors.grayScale[70]} fontSize={'12px'}>
        {name}
      </Text>
    </Flex>
  );
}

export default Tag;
