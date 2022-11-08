import React from 'react';
import {Center, HStack} from 'native-base';

import {colors} from '~/theme/theme';
import {IconNameType} from '~/../types/hospital';
import IconView from './IconView';

interface Props {
  iconName: IconNameType;
}

/**
 * 병원 시설 정보 내용을 가로 배치하기 위한 컴포넌트
 * @param {IconNameType} iconName assets -> icons에 등록된 아이콘 이름
 * @param {PropsWithChildren} children 표시될 컨텐츠 Element
 */

function HospitalInfoContents({
  iconName,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Center>
      <HStack
        width={337}
        borderBottomWidth={1}
        borderBottomColor={colors.grayScale[10]}
        style={{paddingVertical: 24}}>
        <IconView iconName={iconName} />
        {children}
      </HStack>
    </Center>
  );
}

export default HospitalInfoContents;
