import {Menu, Pressable} from 'native-base';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {colors} from '~/theme/theme';
import KebabMenuIcon from '~/assets/icons/kebabMenu.svg';

interface Props {
  top?: number | string;
  left?: number | string;
  kekabMenuViewStyle?: StyleProp<ViewStyle>;
  handleFirstButton: () => void;
  handleSecondButton: () => void;
}

/**
 *@description 키캡 메뉴 view 컴포넌트 (수정/삭제)
 *@param {number} top - top style
 *@param left - left style
 *@param kekabMenuViewStyle - 키캡 뷰 style
 *@param {()=>void} handleFirstButton - 키캡 첫 번째 버튼 핸들러
 *@param {()=>void} handleSecondButton - 키캡 첫 번째 버튼 핸들러
 */
function KekabMenu({
  top,
  left,
  kekabMenuViewStyle,
  handleFirstButton,
  handleSecondButton,
}: Props) {
  return (
    <Menu
      py="12px"
      top={top || '116px'}
      left={left || '20px'}
      placement="right bottom"
      backgroundColor={colors.grayScale['0']}
      style={kekabMenuViewStyle}
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps}>
            <KebabMenuIcon fill={colors.grayScale['70']} />
          </Pressable>
        );
      }}>
      <Menu.Item
        color={colors.grayScale['80']}
        fontSize={'14px'}
        onPress={handleFirstButton}>
        수정
      </Menu.Item>

      <Menu.Item
        color={colors.grayScale['80']}
        fontSize={'14px'}
        onPress={handleSecondButton}>
        삭제
      </Menu.Item>
    </Menu>
  );
}

export default KekabMenu;
