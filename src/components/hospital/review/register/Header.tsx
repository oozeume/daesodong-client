import {Center, HStack, Text} from 'native-base';
import React from 'react';

interface Props {
  title: string;
  rightButton?: JSX.Element;
  leftButton?: JSX.Element;
}
/**
 *@description 페이지 헤더
 *@param {JSX.Element} rightButton - 헤더 기준 좌쪽 위치 버튼
 *@param {JSX.Element} leftButton - 헤더 기준 우쪽 위치 버튼
 */
function Header({title, rightButton, leftButton}: Props) {
  return (
    <HStack alignItems="center" h="60px">
      {leftButton}

      <Center w="100%">
        <Text fontSize={18} color="black">
          {title}
        </Text>
      </Center>

      {rightButton}
    </HStack>
  );
}

export default Header;
