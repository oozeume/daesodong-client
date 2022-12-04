import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import DownIcon from '~/assets/icon/down.svg';
import {colors} from '~/theme/theme';

interface Props {
  onOpen: () => void;
  value: string | undefined;
  placeholder: string;
  buttonStyle?: StyleProp<ViewStyle>;
  innerViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 *@description 샐렉터 오픈 버튼
 *@param value - 현재 선택된 값
 *@param onOpen - 셀렉터 오픈 핸들러
 */
function SelectButtonForm({
  onOpen,
  value,
  placeholder,
  buttonStyle,
  innerViewStyle,
  textStyle,
}: Props) {
  return (
    <Pressable
      borderColor={colors.grayScale[30]}
      borderBottomWidth={1}
      flexDirection="row"
      backgroundColor={colors.grayScale[0]}
      style={buttonStyle}
      onPress={onOpen}>
      <HStack
        width="100%"
        py={'15px'}
        justifyContent="space-between"
        alignItems="center"
        style={innerViewStyle}>
        <Text
          fontSize={'15px'}
          color={value ? colors.grayScale[80] : colors.grayScale[40]}
          style={textStyle}>
          {value ?? placeholder}
        </Text>
        <DownIcon />
      </HStack>
    </Pressable>
  );
}

export default SelectButtonForm;
