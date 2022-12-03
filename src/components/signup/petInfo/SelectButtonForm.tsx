import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import DownIcon from '~/assets/icon/down.svg';
import {colors} from '~/theme/theme';

interface Props {
  onPress: () => void;
  selectorName: string | undefined;
}

function SelectButtonForm({onPress: _onPress, selectorName}: Props) {
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
          color={selectorName ? colors.grayScale[80] : colors.grayScale[40]}>
          {selectorName ?? '거주지 선택'}
        </Text>
        <DownIcon />
      </HStack>
    </Pressable>
  );
}

export default SelectButtonForm;
