import React from 'react';
import {HStack, Text, VStack} from 'native-base';

import {OpeningHoursType} from '../../../pages/hospital/info';

import styles from './styles';

type HospitalOpeningHoursProps = {
  openingHours: OpeningHoursType;
};

const HospitalOpeningHours = ({openingHours}: HospitalOpeningHoursProps) => {
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
};

export default HospitalOpeningHours;
