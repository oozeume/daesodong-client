import React from 'react';
import {Center, HStack} from 'native-base';

import IconView, {IconNameType} from './IconView';

type HospitalInfoContentsType = {
  iconName: IconNameType;
};

/**
 * 병원 시설 정보 내용을 가로 배치하기 위한 컴포넌트
 * @param {IconNameType} iconName assets -> icons에 등록된 아이콘 이름
 * @param children 표시될 컨텐츠 Element
 */

const HospitalInfoContents = ({
  iconName,
  children,
}: React.PropsWithChildren<HospitalInfoContentsType>) => {
  return (
    <Center>
      <HStack
        width={337}
        borderBottomWidth={1}
        borderBottomColor={'#F6F7F7'}
        style={{paddingVertical: 24}}>
        <IconView iconName={iconName} />
        {children}
      </HStack>
    </Center>
  );
};

export default HospitalInfoContents;
