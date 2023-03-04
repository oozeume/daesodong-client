import {Stack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  notice: {category: string};
}

/**
 *@description 내 계정 - 알림 리스트 아이템 컴포넌트
 */

function Notice({notice}: Props) {
  return (
    <Stack
      backgroundColor={
        notice.category === '공지사항'
          ? colors.fussYellow['-30']
          : colors.grayScale[0]
      }
      px={'18px'}
      py={'14px'}
      borderBottomWidth={1}
      borderBottomColor={
        notice.category === '공지사항'
          ? colors.fussYellow['-20']
          : colors.grayScale[10]
      }>
      <Text color={colors.fussOrange[0]} fontSize={'12px'}>
        {notice.category}
      </Text>

      <Text
        mt={'4px'}
        color={colors.grayScale[80]}
        fontSize={'14px'}
        fontWeight={'500'}>
        새로운 동물이 추가되었어요. 새로운 친구야 반가워🧡
      </Text>
      <Text mt={'6px'} fontSize={'11px'} color={colors.grayScale[60]}>
        n분 전
      </Text>
    </Stack>
  );
}

export default Notice;
