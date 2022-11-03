import React from 'react';

import {Pressable, Text} from 'native-base';

interface Props {
  text: string;
  textColor: string;
  btnColor: string;
  btnHeight: string;
  btnBorderWidth: string;
  btnBorderColor: string;
  btnRadius: string;
  handlePress: () => void;
}

/**
 * Daesodong 프로젝트에서 사용할 버튼
 * @param {string} text - 버튼에 들어갈 텍스트
 * @param {string} textColor - 버튼에 들어갈 텍스트의 색상
 * @param {string} btnColor - 버튼 색상
 * @param {string} btnHeight - 버튼 길이
 * @param {string} btnBorderWidth - 버튼 테두리 크기
 * @param {string} btnBorderColor - 버튼 테두리 색상
 * @param {string} btnRadius - 버튼 radius 크기?
 * @param {() => void} handlePress - 버튼을 눌렀을 때 작동하는 이벤트 핸들러
 */

function DButton({
  text,
  textColor,
  btnColor,
  btnHeight,
  btnBorderWidth,
  btnBorderColor,
  btnRadius,
  handlePress,
}: Props) {
  return (
    <Pressable
      w={'100%'}
      h={btnHeight}
      backgroundColor={btnColor}
      borderWidth={btnBorderWidth}
      borderColor={btnBorderColor}
      borderRadius={btnRadius}
      shadow={'0px 3px 4px rgba(0, 0, 0, 0.16'}
      onPress={handlePress}>
      <Text lineHeight={btnHeight} textAlign={'center'} color={textColor}>
        {text}
      </Text>
    </Pressable>
  );
}

export default DButton;
