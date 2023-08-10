import {Text as TextNativeBase} from 'native-base';
import {Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';

/**
 *@description 글자 크기 고정 훅
 */
function useFixFontSize() {
  type TextNativeBaseComponent = typeof TextNativeBase & {
    defaultProps: {
      allowFontScaling: boolean;
    };
  };

  type TextComponent = typeof Text & {
    defaultProps: {
      allowFontScaling: boolean;
    };
  };

  type TextInputComponent = typeof TextInput & {
    defaultProps: {
      allowFontScaling: boolean;
    };
  };

  const _TextNativeBase = TextNativeBase as unknown as TextNativeBaseComponent;
  _TextNativeBase.defaultProps = _TextNativeBase.defaultProps || {};
  _TextNativeBase.defaultProps.allowFontScaling = false;

  const _Text = Text as unknown as TextComponent;
  _Text.defaultProps = _Text.defaultProps || {};
  _Text.defaultProps.allowFontScaling = false;

  const _TextInput = TextInput as unknown as TextInputComponent;
  _TextInput.defaultProps = _TextInput.defaultProps || {};
  _TextInput.defaultProps.allowFontScaling = false;

  return;
}

export default useFixFontSize;
