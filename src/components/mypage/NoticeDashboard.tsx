import {HStack, Stack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  name: string;
  count: number;
  icon: JSX.Element;
}

/**
 *@description 내 계정 메인 - 상단 알림 대시보드
 */

function NoticeDashboard({name, count, icon}: Props) {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      w={'107px'}
      h={'74px'}
      borderRadius={'8px'}
      backgroundColor={colors.fussOrange['-10']}
      space={'4px'}>
      {icon}
      <HStack space={'4px'}>
        <Text fontSize={'13px'} color={colors.grayScale[80]}>
          {name}
        </Text>
        <Text fontSize={'13px'} fontWeight={'700'} color={colors.grayScale[80]}>
          {count}
        </Text>
      </HStack>
    </Stack>
  );
}

export default NoticeDashboard;
