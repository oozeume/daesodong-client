import {HStack, Pressable, Text, useDisclose} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';
import DownIcon from '~/assets/icons/down.svg';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 종
 */

function PetTypeSelector({handlePage}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <LayoutContainer buttonPress={handlePage}>
      <Pressable
        borderColor="#E1E2E4"
        borderBottomWidth={1}
        flexDirection="row"
        backgroundColor="#fff"
        onPress={onOpen}>
        <HStack
          width="100%"
          paddingBottom="15px"
          justifyContent="space-between"
          alignItems="center">
          <Text fontSize={15} color={colors.grayScale[40]}>
            종을 선택해주세요
          </Text>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>
    </LayoutContainer>
  );
}

export default PetTypeSelector;
