import React, {useRef, useState} from 'react';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {colors} from '~/theme/theme';
import useGetKeyboardHeight from '~/hooks/useGetKeyboardHeight';
import {Modal} from 'react-native';
import {APP_HEIGHT} from '~/utils/dimension';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import useToastShow from '~/hooks/useToast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 *@description 1:1 문의 등록 팝업
 */
function InquiryRegisterModal({isOpen, onClose}: Props) {
  const keyobardHeight = useGetKeyboardHeight();
  const {toastShow} = useToastShow();
  const inputRef = useRef();
  const [inquiryText, setInquiryText] = useState('');

  // 대소동팀에게 전달, 취소 버튼
  const buttonListPaddingBottom = 20;
  const modalBottom = keyobardHeight - buttonListPaddingBottom;

  const onOK = () => {
    toastShow('1:1 문의가 등록되었어요.\n확인 후 최대한 빨리 답변드릴게요!');
    onClose();
  };
  const onCancel = () => {
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent>
      <Pressable
        width="100%"
        height={APP_HEIGHT}
        bgColor={colors.scrim['60']}
        onPress={onCancel}
        position="absolute"
        zIndex={0}
      />

      <Center
        p={0}
        w={'100%'}
        borderTopRadius={'20px'}
        borderBottomRadius={'none'}
        bgColor={colors.grayScale[0]}
        mb={0}
        mt={'auto'}
        pb={'40px'}
        bottom={keyobardHeight && modalBottom}>
        <VStack pt="28px" px={'18px'} w={'100%'}>
          {/* 모달 헤더 */}
          <Box px="18px" mb="24px">
            <Center>
              <Text
                fontSize={18}
                fontWeight={'500'}
                color={colors.grayScale[80]}>
                {'1:1 문의 남기기'}
              </Text>
            </Center>
          </Box>

          <TextArea
            autoFocus
            bgColor={colors.grayScale[0]}
            autoCompleteType={undefined}
            borderRadius={8}
            borderColor={colors.grayScale['30']}
            borderWidth={1}
            h="160px"
            mb="12px"
            px={'16px'}
            py={'14px'}
            fontSize={'15px'}
            placeholder={'대소동팀에게 물어보고 싶으신 것이 있나요?'}
            placeholderTextColor={colors.grayScale['40']}
            onChangeText={setInquiryText}
            value={inquiryText}
            ref={inputRef}
          />

          {/* 버튼 리스트 */}
          <HStack pt="12px" space="8px">
            <RedActiveLargeButton
              buttonStyle={{
                width: 80,
                backgroundColor: colors.grayScale[10],
                borderColor: colors.grayScale[60],
              }}
              text={'취소'}
              active
              handlePress={onCancel}
            />

            <Stack flex={1}>
              <RedActiveLargeButton
                active={inquiryText.length > 4}
                text={'대소동팀에게 전달'}
                handlePress={onOK}
              />
            </Stack>
          </HStack>
        </VStack>
      </Center>
    </Modal>
  );
}

export default InquiryRegisterModal;
