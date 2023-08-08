import {HStack, Text, Pressable} from 'native-base';

import React from 'react';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  onPress: () => void;
  name: string;
  style: StyleProp<ViewStyle>;
}

/**
 *@description 시설 메인 지도 필터 버튼
 * @param name - 선택된 필터 이름
 */
function MapFilterButton({onPress, name, style}: Props) {
  return (
    <Pressable borderRadius={8} flex={1} onPress={onPress} style={style}>
      <HStack
        justifyContent="space-between"
        alignItems={'center'}
        w={'100%'}
        h="34px"
        pl="14px"
        pr="10px">
        <Text ml="4px" fontSize={'13px'} color={colors.grayScale['70']}>
          {name}
        </Text>

        <DownIcon />
      </HStack>
    </Pressable>
  );
}

export default MapFilterButton;
