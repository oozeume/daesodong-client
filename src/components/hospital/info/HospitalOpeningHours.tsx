import React from 'react';
import {HStack, Text, VStack} from 'native-base';
import {colors} from '~/theme/theme';

interface Props {
  openingHours: {date: string, time: string};
}

/**
 * 영업 시간 가로 배치를 위한 컴포넌트
 */

function HospitalOpeningHours({openingHours}: Props) {
  return (
    <HStack space={2}>
      <Text
        fontSize={14}
        color={colors.grayScale[70]}
        fontWeight={'400'}
        textAlign={'left'}
        style={{width: 40, marginRight: 20}}>
        {openingHours.date}
      </Text>
      <VStack space={1} width={239}>
        <Text
          fontSize={14}
          color={colors.grayScale[70]}
          fontWeight={'400'}
          textAlign={'left'}>
          {openingHours.time}
        </Text>
      </VStack>
    </HStack>
  );
}

export default HospitalOpeningHours;
