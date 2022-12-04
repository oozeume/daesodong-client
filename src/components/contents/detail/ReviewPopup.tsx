import React, {useState} from 'react';
import {
  Box,
  Center,
  Flex,
  Modal,
  Pressable,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {colors} from '~/theme/theme';

import CheckIcon from '../../../assets/icons/check.svg';
import RightIcon from '../../../assets/icons/right.svg';
import BackIcon from '../../../assets/icon/back_icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';
import Button from '~/components/common/button';

interface Props {
  visible: boolean;
  handleModal: () => void;
}

function ReviewPopup({visible, handleModal}: Props) {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const handleSignUp = () => handleModal();

  return (
    <Modal w={'100%'} isOpen={visible} size={'full'}>
      <Modal.Content
        w={'100%'}
        h={'284px'}
        borderTopRadius={'20px'}
        borderBottomRadius={'none'}
        mb={0}
        mt={'auto'}>
        <VStack h={'100%'} px={'18px'}>
          {/* 모달 헤더 */}
          <Box pt="28px" pb="12px" px="18px">
            <Center py={'28px'}>
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
            autoCompleteType={undefined}
            borderRadius={8}
            borderColor={colors.grayScale['30']}
            borderWidth={1}
            px={'16px'}
            py={'14px'}
            placeholder={
              '콘텐츠를 읽으면서 궁금했던 점을 알려주시면 대소동팀이 더 열심히 공부해서 알려드릴게요.'
            }
            placeholderTextColor={colors.grayScale['40']}
          />

          {/* 버튼 리스트 */}
          <Box h={'104px'} pt="12px" pb="40px" px="18px">
            <Button
              large
              shadow
              text={'닫기'}
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
              handlePress={handleSignUp}
              active
            />

            <Button
              large
              shadow
              text={'확인'}
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
              handlePress={handleSignUp}
              active
            />
          </Box>
        </VStack>
      </Modal.Content>
    </Modal>
  );
}

export default ReviewPopup;
