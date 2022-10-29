import React from 'react';
import {HStack, Text, VStack} from 'native-base';

import {OpeningHoursType} from '../../../pages/hospital/info';

import styles from './styles';

interface Props {
  openingHours: OpeningHoursType;
}

/**
 * 영업 시간 가로 배치를 위한 컴포넌트
 * @param {OpeningHoursType} openingHour 임시 타입으로 영업 요일, 총 영업 시간, 휴게 시간
 * @TODO API 연동 후 타입 및 데이터 변경
 */

function HospitalOpeningHours({openingHours}: Props) {
  return (
    <HStack space={2}>
      <Text
        style={[styles.text, {width: 40, marginRight: 20, textAlign: 'left'}]}>
        {openingHours.date}
      </Text>
      <VStack space={1} width={239}>
        <Text style={[styles.text, {textAlign: 'left'}]}>
          {openingHours.totalHour}
        </Text>
        {openingHours.break && (
          <Text style={[styles.text, {textAlign: 'left'}]}>
            {openingHours.break} 휴게시간
          </Text>
        )}
      </VStack>
    </HStack>
  );
}

export default HospitalOpeningHours;
