import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import RightIcon from '~/assets/icons/right.svg';
import {colors} from '~/theme/theme';

interface Props {
  text: string | JSX.Element;
  info?: any;
  onPress?: () => void;
  isInvisibleIcon?: boolean;
}

function Info({text, info, onPress, isInvisibleIcon = false}: Props) {
  return (
    <Pressable onPress={onPress}>
      <HStack
        py={'22px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
        borderBottomColor={colors.grayScale[10]}>
        <Text fontSize={'13px'} color={colors.grayScale[70]}>
          {text}
        </Text>

        <HStack alignItems={'center'}>
          <Text color={colors.grayScale[80]} fontSize={'15px'}>
            {info}
          </Text>
          {!isInvisibleIcon && <RightIcon stroke={colors.grayScale[80]} />}
        </HStack>
      </HStack>
    </Pressable>
  );
}

export default Info;
