import {Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  isActive?: boolean;
  name: string;
  onPress: () => void;
  fontColor?: string;
  borderColor?: string;
  bgColor?: string;
}

/**
 *@description 컨텐츠 메인 > 리스트 상단 필터 버튼
 */
const FilterButton = ({
  isActive,
  name,
  onPress,
  fontColor,
  borderColor,
  bgColor,
}: Props) => {
  return (
    <Pressable
      mr="8px"
      px="16px"
      py="6px"
      borderRadius={'20px'}
      borderWidth={1}
      borderColor={
        isActive ? colors.fussOrange['0'] : borderColor ?? colors.grayScale[30]
      }
      bgColor={
        isActive ? colors.fussOrange['-40'] : bgColor ?? colors.grayScale[0]
      }
      onPress={onPress}>
      <Text
        fontSize={'13px'}
        fontWeight={400}
        color={
          isActive ? colors.fussOrange['0'] : fontColor ?? colors.grayScale[60]
        }>
        {name}
      </Text>
    </Pressable>
  );
};

export default FilterButton;
