import {Center, Pressable, Text} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native';

interface ButtonBarProps {
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  text: string;
  backgroundColor?: ColorType;
}

/**
 *@description 일반적인 넓은 버튼 형식
 *@param {()=>void} onPress - 버튼 클릭 이벤트 핸들러
 *@param {()=>void} textStyle - 버튼 텍스트 커스텀 스타일
 *@param {()=>void} buttonStyle - 버튼 커스텀 스타일
 *@param {()=>void} text - 버튼 텍스트
 *@param {()=>void} backgroundColor - 버튼 칼라
 */
function ButtonBar({
  onPress,
  textStyle,
  buttonStyle,
  text,
  backgroundColor,
}: ButtonBarProps) {
  return (
    <Pressable
      h="52px"
      borderRadius="8px"
      style={buttonStyle}
      backgroundColor={backgroundColor}
      onPress={onPress}>
      <Center h="100%">
        <Text color="grayScale.90" fontSize="16px" style={textStyle}>
          {text}
        </Text>
      </Center>
    </Pressable>
  );
}

interface ActiveButtonProps extends ButtonBarProps {
  isActive?: boolean;
  activeBackgroundColor?: ColorType;
  inactiveBackgroundColor?: ColorType;
  activeBorderColor?: ColorValue;
  inactiveBorderColor?: ColorValue;
  activeTextColor?: ColorValue;
  inactiveTextColor?: ColorValue;
}

/**
 *@description 활성화 버튼
 *@param {boolean} isActive - 버튼 활성화 여부
 *@param {ColorType} activeBackgroundColor - 버튼 배경 활성화 색상
 *@param {ColorType} inactiveBackgroundColor - 버튼 배경 비활성화 색상
 *@param {ColorValue} activeBorderColor - 버튼 선 활성화 색상
 *@param {ColorValue} inactiveBorderColor - 버튼 선 비활성화 색상
 *@param {ColorValue} activeTextColor - 버튼 텍스트 활성화 색상
 *@param {ColorValue} inactiveTextColor - 버튼 텍스트 비활성화 색상
 */
function ActiveButton({
  onPress,
  textStyle,
  buttonStyle,
  text,
  isActive,
  activeBackgroundColor = 'fussOrange.0',
  inactiveBackgroundColor = 'fussOrange.-30',
  activeBorderColor = 'grayScale.90',
  inactiveBorderColor = 'grayScale.50',
  activeTextColor = 'grayScale.90',
  inactiveTextColor = 'grayScale.50',
}: ActiveButtonProps) {
  return (
    <ButtonBar
      text={text}
      onPress={onPress}
      backgroundColor={
        isActive ? activeBackgroundColor : inactiveBackgroundColor
      }
      buttonStyle={[
        buttonStyle,
        {
          borderWidth: 1,
          borderColor: isActive ? activeBorderColor : inactiveBorderColor,
        },
      ]}
      textStyle={[
        {
          color: isActive ? activeTextColor : inactiveTextColor,
        },
        textStyle,
      ]}
    />
  );
}

export {ButtonBar, ActiveButton};
