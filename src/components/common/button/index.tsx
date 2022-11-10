import React from 'react';
import {Pressable, Text} from 'native-base';

interface Colors {
  active?: string;
  disabled?: string;
}

interface Props {
  text: string;
  fontColors: Colors;
  buttonColors: Colors;
  borderColors: Colors;
  width?: string;
  large?: boolean;
  active?: boolean;
  shadow?: boolean;
  handlePress?: () => void;
}

/**
 * 대소통 서비스에서 사용되는 버튼 컴포넌트
 * @param {string} text - 버튼 텍스트
 * @param {Colors} fontColors - 버튼 텍스트 색상 ( active, disabled )
 * @param {Colors} buttonColors - 버튼 색상 ( active, disabled )
 * @param {Colors} borderColors - 버튼 테두리 색상 ( active, disabled )
 * @param {string} width - 버튼 지정 길이
 * @param {boolean} large - 큰 사이즈 버튼
 * @param {boolean} active - 버튼 활성화 on/off
 * @param {boolean} shadow - 버튼 그림자 on/off
 * @param {() => void} handlePress - 버튼 클릭 핸들러
 */
function Button({
  text,
  fontColors,
  buttonColors,
  borderColors,
  width,
  large,
  active,
  shadow,
  handlePress,
}: Props) {
  return (
    <Pressable
      w={width ?? '100%'}
      h={large ? '52px' : '36px'}
      backgroundColor={active ? buttonColors.active : buttonColors.disabled}
      borderWidth={'1px'}
      borderRadius={large ? '8px' : '4px'}
      borderColor={active ? borderColors.active : borderColors.disabled}
      disabled={!active}
      style={
        shadow && {shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15}
      }
      onPress={handlePress}>
      <Text
        lineHeight={large ? '52px' : '36px'}
        textAlign={'center'}
        color={active ? fontColors.active : fontColors.disabled}>
        {text}
      </Text>
    </Pressable>
  );
}

export default Button;
