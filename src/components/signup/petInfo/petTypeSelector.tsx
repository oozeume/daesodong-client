import {HStack, Pressable, Stack, Text, useDisclose} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';
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
    <LayoutContainer>
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

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default PetTypeSelector;
