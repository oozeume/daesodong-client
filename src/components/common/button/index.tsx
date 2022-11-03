import React from 'react';
import {Pressable, Text} from 'native-base';

interface Props {
  w?: string;
  large?: boolean;
  text: string;
  btnColor: string;
  disabledColor?: string;
  fontColor?: string;
  active?: boolean;
  shadow?: boolean;
  handlePress?: () => void;
}

/**
 * 대소통 서비스에서 사용되는 버튼 컴포넌트
 * @param {string} w - 버튼 지정 길이
 * @param {boolean} large - 큰 사이즈 버튼
 * @param {string} text - 버튼 텍스트
 * @param {string} btnColor - 버튼 색상
 * @param {string} disabledColor - 버튼 비활성화일때 색상
 * @param {string} fontColor - 버튼 텍스트 색상
 * @param {boolean} active - 버튼 활성화 on/off
 * @param {boolean} shadow - 버튼 그림자 on/off
 * @param {() => void} handlePress - 버튼 클릭 핸들러
 */
function Button({
  w,
  large,
  text,
  btnColor,
  disabledColor,
  fontColor = '#1A1E27',
  active,
  shadow,
  handlePress,
}: Props) {
  return (
    <Pressable
      w={w ? w : '100%'}
      h={large ? '52px' : '36px'}
      backgroundColor={active ? btnColor : disabledColor}
      borderWidth={'1px'}
      borderRadius={large ? '8px' : '4px'}
      borderColor={active ? '#1A1E27' : '#9EA1A8'}
      disabled={!active}
      style={
        shadow && {shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15}
      }
      onPress={handlePress}>
      <Text
        lineHeight={large ? '52px' : '36px'}
        textAlign={'center'}
        color={active ? fontColor : '#9EA1A8'}>
        {text}
      </Text>
    </Pressable>
  );
}

export default Button;
