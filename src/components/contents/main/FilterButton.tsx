import {Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  isActive?: boolean;
  name: string;
  onPress: () => void;
}

/**
 *@description 컨텐츠 메인 > 리스트 상단 필터 버튼
 */
const FilterButton = ({isActive, name, onPress}: Props) => {
  return (
    <Pressable
      mr="8px"
      px="16px"
      py="6px"
      borderRadius={'20px'}
      borderColor={isActive ? colors.fussOrange[0] : colors.grayScale[30]}
      bgColor={isActive ? colors.fussOrange['-40'] : colors.grayScale[0]}
      onPress={onPress}>
      <Text
        fontSize={'13px'}
        fontWeight={400}
        color={isActive ? colors.fussOrange[0] : colors.grayScale[0]}>
        {name}
      </Text>
    </Pressable>
  );
};

export default FilterButton;
