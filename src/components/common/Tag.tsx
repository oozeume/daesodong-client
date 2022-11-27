import {Flex, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  tagName: string;
  bgColor?: string;
  color?: string;
}

function Tag({tagName, bgColor, color}: Props) {
  return (
    <Flex
      w={'44px'}
      h={'20px'}
      borderRadius={'4px'}
      backgroundColor={bgColor ?? colors.grayScale[20]}
      alignItems={'center'}>
      <Text color={color ?? colors.grayScale[70]} fontSize={'12px'}>
        {tagName}
      </Text>
    </Flex>
  );
}

export default Tag;
