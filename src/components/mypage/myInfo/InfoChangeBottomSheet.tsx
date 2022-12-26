import {Actionsheet} from 'native-base';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ElementComponent: JSX.Element;
  height?: string | number;
}

/**
 *@description 내 계정 - 내 정보 - 변경 내용이 담긴 BottomSheet
 */

function InfoChangeBottomSheet({
  isOpen,
  onClose,
  ElementComponent,
  height,
}: Props) {
  return (
    <Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        backgroundColor={'white'}
        h={height ?? '292px'}
        px={'18px'}
        borderTopRadius={'28px'}
        borderBottomRadius={'none'}>
        {ElementComponent}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default InfoChangeBottomSheet;
