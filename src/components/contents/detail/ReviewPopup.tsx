import React from 'react';
import {
  Box,
  Center,
  HStack,
  Modal,
  Pressable,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {colors} from '~/theme/theme';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
}

function ReviewPopup({visible, onCancel, onOK}: Props) {
  return (
    <Modal w={'100%'} isOpen={visible} size={'full'}>
      <Modal.Content
        w={'100%'}
        borderTopRadius={'20px'}
        borderBottomRadius={'none'}
        mb={0}
        mt={'auto'}>
        <VStack pt="28px" px={'18px'}>
          {/* 모달 헤더 */}
          <Box px="18px" mb="24px">
            <Center>
              <Text
                fontSize={18}
                fontWeight={'500'}
                color={colors.grayScale[80]}>
                무엇이 아쉬우셨나요?🥲
              </Text>
            </Center>
          </Box>

          <Box
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

            <Text
              marginBottom={'4px'}
              fontSize={'14px'}
              fontWeight={400}
              color={colors.grayScale['60']}>
              • 소개한 내용의 예시를 더 자세히 알고 싶어요!
            </Text>

            <Text
              fontSize={'14px'}
              fontWeight={400}
              color={colors.grayScale['60']}>
              • 다른 동물에 관련된 정보고 알고 싶어요!
            </Text>
          </Box>

          <TextArea
            bgColor={colors.grayScale[0]}
            autoCompleteType={undefined}
            borderRadius={8}
            borderColor={colors.grayScale['30']}
            borderWidth={1}
            h="160px"
            px={'16px'}
            py={'14px'}
            placeholder={
              '콘텐츠를 읽으면서 궁금했던 점을 알려주시면 대소동팀이 더 열심히 공부해서 알려드릴게요.'
            }
            placeholderTextColor={colors.grayScale['40']}
          />

          {/* 버튼 리스트 */}
          <HStack h={'104px'} pt="12px" pb="40px">
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
              flex={3}
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
      </Modal.Content>
    </Modal>
  );
}

export default ReviewPopup;
