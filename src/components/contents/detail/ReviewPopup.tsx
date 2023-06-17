import React, {useMemo} from 'react';
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import {colors} from '~/theme/theme';
import useGetKeyboardHeight from '~/hooks/useGetKeyboardHeight';
import {Keyboard} from 'react-native';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
  title: string;
  exampleTextList: string[];
  placeholder: string;
}

const CONTAINER_HEIGHT = 500;

/**
 *@description 컨텐츠 리뷰 팝업 (ex. 무엇이 아쉬우셨나요?)
 *@param onOK - 대소동 팀에게 전달 버튼 핸들러
 *@param onCancel - 취소 버튼 핸들러
 *@param exampleTextList - 질문 예시 리스트
 */
function ReviewPopup({
  visible,
  onCancel,
  onOK,
  title,
  exampleTextList,
  placeholder,
}: Props) {
  const keyobardHeight = useGetKeyboardHeight();

  const heihgt = useMemo(() => {
    return CONTAINER_HEIGHT + keyobardHeight;
  }, [keyobardHeight]);

  return (
    <Actionsheet
      isOpen={visible}
      onClose={() => {
        onOK;
      }}
      hideDragIndicator>
      <Actionsheet.Content height={heihgt}>
        <Stack w={'100%'} px={'18px'} pt={'28px'}>
          <Box mb="24px">
            <Center>
              <Text
                fontSize={18}
                fontWeight={'500'}
                color={colors.grayScale[80]}>
                {title}
              </Text>
            </Center>
          </Box>

          <Box
            w="100%"
            mb="12px"
            pt="16px"
            pb="18px"
            px="18px"
            bgColor={colors.grayScale['10']}
            borderRadius={8}>
            <Text
              marginBottom={'8px'}
              fontSize={'14px'}
              fontWeight={500}
              color={colors.grayScale['70']}>
              아래 예시처럼 질문을 간단하게 적어보세요
            </Text>

            {exampleTextList.map((item, i) => (
              <Text
                key={i.toString()}
                marginBottom={'4px'}
                fontSize={'14px'}
                fontWeight={400}
                color={colors.grayScale['60']}>
                • {item}
              </Text>
            ))}
          </Box>

          <TextArea
            autoFocus={false}
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
            placeholder={placeholder}
            placeholderTextColor={colors.grayScale['40']}
          />

          {/* 버튼 리스트 */}
          <HStack pt="12px">
            <Pressable
              flex={1}
              bgColor={colors.grayScale[10]}
              borderWidth={1}
              borderColor={colors.grayScale[60]}
              borderRadius={8}
              mr="8px"
              onPress={() => {
                Keyboard.dismiss();
                onCancel();
              }}>
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
              onPress={() => {
                Keyboard.dismiss();
                onOK();
              }}>
              <Center h="52px">
                <Text color={colors.grayScale[90]}>대소동팀에게 전달</Text>
              </Center>
            </Pressable>
          </HStack>
        </Stack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default ReviewPopup;
