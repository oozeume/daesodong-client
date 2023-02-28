import {Center, HStack, Text} from 'native-base';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEADER_HEIGHT} from '~/constants/heights';
import {colors} from '~/theme/theme';

interface Props {
  title?: string;
  rightButton?: JSX.Element;
  leftButton?: JSX.Element;
  isRemoveTopPosition?: boolean;
}
/**
 *@description 페이지 헤더
 *@param {JSX.Element} rightButton - 헤더 기준 좌쪽 위치 버튼
 *@param {JSX.Element} leftButton - 헤더 기준 우쪽 위치 버튼
 */
function Header({title, rightButton, leftButton, isRemoveTopPosition}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <HStack
      top={isRemoveTopPosition ? undefined : insets.top}
      alignItems={'center'}
      h={`${HEADER_HEIGHT}px`}
      bgColor={colors.grayScale[0]}>
      <HStack left="18px" position={'absolute'} zIndex={1}>
        {leftButton}
      </HStack>

      <Center w="100%">
        <Text fontSize={18} color={colors.grayScale[90]}>
          {title || ''}
        </Text>
      </Center>

      <HStack right="18px" position={'absolute'} zIndex={1}>
        {rightButton}
      </HStack>
    </HStack>
  );
}

export default Header;
