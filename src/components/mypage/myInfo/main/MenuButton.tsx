import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  buttonName: string;
  onPress?: () => void;
  count?: number;
  rightElement?: JSX.Element;
}
/**
 *@description 내 계정 - 메인 메뉴 리스트 버튼
 */

function MenuButton({buttonName, onPress, count, rightElement}: Props) {
  return (
    <Pressable onPress={onPress}>
      <HStack
        py={'14px'}
        space={'10px'}
        justifyContent={rightElement ? 'space-between' : 'flex-start'}>
        <Text fontSize={'16px'} color={colors.grayScale[80]}>
          {buttonName}
        </Text>

        {count && (
          <Text fontSize={'16px'} color={colors.fussOrange[0]}>
            {count}
          </Text>
        )}

        {rightElement}
      </HStack>
    </Pressable>
  );
}

export default MenuButton;
