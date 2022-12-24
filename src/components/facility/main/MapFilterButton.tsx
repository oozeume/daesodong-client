import {HStack, Text, Pressable} from 'native-base';

import React from 'react';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import {StyleSheet} from 'react-native';

interface Props {
  onPress: () => void;
  name: string;
}

/**
 *@description 시설 메인 지도 필터 버튼
 * @param name - 선택된 필터 이름
 */
function MapFilterButton({onPress, name}: Props) {
  return (
    <Pressable
      borderRadius={8}
      w={'31.5%'}
      onPress={onPress}
      style={styles.shadow}>
      <HStack
        justifyContent="space-between"
        alignItems={'center'}
        w={'100%'}
        h="34px"
        pl="14px"
        pr="10px"
        borderRadius={8}
        bgColor={colors.grayScale['0']}>
        <Text ml="4px" fontSize={'13px'} color={colors.grayScale['70']}>
          {name}
        </Text>

        <DownIcon />
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      // 안드로이드에서 안됨
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84, // 안드로이드에서 안됨
    elevation: 3,
  },
});

export default MapFilterButton;
