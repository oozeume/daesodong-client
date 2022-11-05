import {Center, Pressable, Text} from 'native-base';
import React from 'react';
import {ButtonBarProps} from '~/../types/common/button';

/**
 *@description 일반적인 넓은 버튼 형식
 *@param {()=>void} onPress - 버튼 클릭 이벤트 핸들러
 *@param {TextStyle} nameStyle - 버튼 이름 텍스트 커스텀 스타일
 *@param {ViewStyle} buttonStyle - 버튼 커스텀 스타일
 *@param {string} name - 버튼 이름 텍스트
 *@param {ColorType} backgroundColor - 버튼 칼라
 */
function ButtonBar({
  onPress,
  nameStyle,
  buttonStyle,
  name,
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
        <Text color="grayScale.90" fontSize="16px" style={nameStyle}>
          {name}
        </Text>
      </Center>
    </Pressable>
  );
}

export default ButtonBar;
