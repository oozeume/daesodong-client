import _ from 'lodash';
import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import DownIcon from '~/assets/icon/down.svg';
import {colors} from '~/theme/theme';

interface Props {
  onPress: () => void;
  value?: string;
  placeholder?: string;
}

function SelectButtonForm({onPress: _onPress, value, placeholder}: Props) {
  return (
    <Pressable
      borderColor={colors.grayScale[30]}
      borderBottomWidth={1}
      flexDirection="row"
      backgroundColor={colors.grayScale[0]}
      onPress={_onPress}>
      <HStack
        width="100%"
        py={'15px'}
        justifyContent="space-between"
        alignItems="center">
        <Text
          fontSize={'15px'}
          color={
            _.isEmpty(value) ? colors.grayScale[40] : colors.grayScale[80]
          }>
          {_.isEmpty(value) ? placeholder : value}
        </Text>
        <DownIcon />
      </HStack>
    </Pressable>
  );
}

export default SelectButtonForm;
