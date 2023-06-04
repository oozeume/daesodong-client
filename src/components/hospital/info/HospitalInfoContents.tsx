import React from 'react';
import {Box, Center, HStack} from 'native-base';

import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';
import {MARGIN_X} from '~/constants/facility/detail';

interface Props {
  icon: any;
}

/**
 * 병원 시설 정보 내용을 가로 배치하기 위한 컴포넌트
 * @param {IconNameType} iconName assets -> icons에 등록된 아이콘 이름
 * @param {PropsWithChildren} children 표시될 컨텐츠 Element
 */

function HospitalInfoContents({
  icon,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Center>
      <HStack
        width={APP_WIDTH - MARGIN_X * 2}
        borderBottomWidth={1}
        borderBottomColor={colors.grayScale[10]}
        style={{paddingVertical: 24}}>
        <Box marginRight={'20px'}>{icon}</Box>
        {children}
      </HStack>
    </Center>
  );
}

export default HospitalInfoContents;
