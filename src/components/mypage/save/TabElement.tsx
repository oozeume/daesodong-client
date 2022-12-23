import {Pressable, Text} from 'native-base';
import React from 'react';
import {APP_WIDTH} from '~/utils/dimension';
import {TABS} from '~/../types/mypage';
import {ValuesType} from 'utility-types';

const TAB_PADDING_X = 18;
const TAB_WIDTH = APP_WIDTH - TAB_PADDING_X * 2;

interface Props {
  text: ValuesType<typeof TABS>;
  active?: boolean;
  onPress?: () => void;
  onLayout?: any;
}

function TabElement({text, active, onPress, onLayout}: Props) {
  return (
    <Pressable
      width={TAB_WIDTH / 3}
      flex={1}
      onPress={onPress}
      onLayout={e =>
        onLayout({width: e.nativeEvent.layout.width, x: e.nativeEvent.layout.x})
      }>
      <Text
        py={'14px'}
        textAlign={'center'}
        color={'#1A1A1A'}
        opacity={active ? 1 : 0.5}>
        {text}
      </Text>
    </Pressable>
  );
}

export default TabElement;
