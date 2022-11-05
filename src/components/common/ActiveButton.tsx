import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import {ColorValue} from 'react-native';
import {ButtonBarProps} from '~/../types/common/button';
import ButtonBar from './ButtonBar';

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
  nameStyle,
  buttonStyle,
  name,
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
      name={name}
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
      nameStyle={[
        {
          color: isActive ? activeTextColor : inactiveTextColor,
        },
        nameStyle,
      ]}
    />
  );
}

export default ActiveButton;
