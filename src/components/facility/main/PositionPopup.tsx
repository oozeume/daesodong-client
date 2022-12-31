import React from 'react';
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import {Hangjungdong} from '~/components/signup/petInfo/AddressDrawer';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
  onSidoPress: () => void;
  onSigunguPress: () => void;
  sidoValue?: Partial<Hangjungdong>;
  sigugunValue?: Partial<Hangjungdong>;
}

/**
 *@description 시설 메인 위치 선택 팝업
 *@param onOK - 확인 버튼 핸들러
 *@param onCancel - 취소 버튼 핸들러
 */
function PositionPopup({
  visible,
  onCancel,
  onOK,
  onSidoPress,
  onSigunguPress,
  sidoValue,
  sigugunValue,
}: Props) {
  return (
    <Actionsheet isOpen={visible} hideDragIndicator>
      <Actionsheet.Content>
        <Center
          p={0}
          w={'100%'}
          borderTopRadius={'20px'}
          borderBottomRadius={'none'}
          bgColor={colors.grayScale[0]}
          mb={0}
          mt={'auto'}
          pb={'40px'}>
          <VStack pt="28px" px={'18px'} w={'100%'}>
            {/* 모달 헤더 */}
            <Box mb="24px">
              <Center>
                <Text
                  fontSize={18}
                  fontWeight={'500'}
                  color={colors.grayScale[80]}>
                  위치
                </Text>
              </Center>
            </Box>

            <Box mb="12px">
              <Pressable
                mb="16px"
                py="15px"
                flexDir={'row'}
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth={1}
                borderBottomColor={colors.grayScale[30]}
                onPress={onSidoPress}>
                <Text>{sidoValue?.name || '서울'}</Text>
                <DownIcon />
              </Pressable>

              <Pressable
                py="15px"
                flexDir={'row'}
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth={1}
                borderBottomColor={colors.grayScale[30]}
                onPress={onSigunguPress}>
                <Text>{sigugunValue?.name || '광진구'}</Text>
                <DownIcon />
              </Pressable>
            </Box>

            {/* 버튼 리스트 */}
            <HStack pt="12px">
              <Pressable
                flex={1}
                bgColor={colors.grayScale[10]}
                borderWidth={1}
                borderColor={colors.grayScale[60]}
                borderRadius={8}
                mr="8px"
                onPress={onCancel}>
                <Center h="52px">
                  <Text color={colors.grayScale[90]}>닫기</Text>
                </Center>
              </Pressable>

              <Pressable
                flex={4}
                bgColor={colors.fussOrange[0]}
                borderWidth={1}
                borderColor={colors.grayScale[90]}
                borderRadius={8}
                onPress={onOK}>
                <Center h="52px">
                  <Text color={colors.grayScale[90]}>확인</Text>
                </Center>
              </Pressable>
            </HStack>
          </VStack>
        </Center>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PositionPopup;
