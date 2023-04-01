import {Button, HStack, Pressable, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import Tag from '~/components/common/Tag';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 1:1 문의 리스트 아이템
 */

function InquiryItem() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setOpen(prev => !prev)}>
        <Stack
          p={'18px'}
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale['10']}>
          <HStack space={'8px'}>
            <Text fontSize={'12px'} color={colors.grayScale['40']}>
              YYYY.MM.DD
            </Text>

            <Stack
              px={'6px'}
              py={'1px'}
              borderRadius={'4px'}
              backgroundColor={colors.fussOrange['-30']}>
              <Text
                fontSize={'10px'}
                lineHeight={'16px'}
                color={colors.fussOrange['0']}>
                답변대기
              </Text>
            </Stack>
          </HStack>

          <Text mt={'6px'} color={colors.grayScale['70']}>
            1:1 문의 내용이 전체 노출됩니다. 이름자를 언덕 봄이 아름다운 어머니
            별들을 이런 봅니다. 패, 흙으로 어머님, 걱정도 쓸쓸함과 새겨지는
            있습니다.
          </Text>

          <Pressable
            w="26px"
            mt={'6px'}
            pt="6px"
            borderBottomWidth={1}
            borderBottomColor={colors.grayScale['60']}>
            <Text color={colors.grayScale['60']}>삭제</Text>
          </Pressable>
        </Stack>
      </Pressable>

      {open && (
        <Stack
          space={'28px'}
          py={'28px'}
          px={'18px'}
          backgroundColor={colors.grayScale[10]}>
          <Stack space={'8px'}>
            <Text
              fontWeight={500}
              fontSize={'13px'}
              color={colors.grayScale[80]}>
              A. 답변
            </Text>
            <Text color={colors.grayScale[70]}>
              이름자를 언덕 봄이 아름다운 어머니 별들을 이런 봅니다. 패, 흙으로
              어머님, 걱정도 쓸쓸함과 새겨지는 있습니다. 그러나 슬퍼하는 이런
              애기 까닭이요, 무성할 이름을 부끄러운 그리고 이름자를 언덕 봄이
              아름다운 어머니 별들을 이런 봅니다. 패, 흙으로 어머님, 걱정도
              쓸쓸함과 새겨지는 있습니다. 그러나 슬퍼하는 이런 애기 까닭입니다.
            </Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default InquiryItem;
