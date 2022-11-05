import {Progress} from 'native-base';
import React from 'react';

/**
 *@description 입력 단계시 사용하는 공통 프로그래스 바

 * @param {number} value 현재 단계 값(총 단계 100 기준)
 */

interface Props {
  value: number;
}

function RegisterProgress({value}: Props) {
  return (
    <Progress
      size={'xs'}
      value={value}
      style={{borderRadius: 0, height: 1, backgroundColor: 'grayScale.20'}}
      _filledTrack={{
        borderRadius: 0,
        height: 1,
        bgColor: 'fussOrange.0',
      }}
    />
  );
}

export default RegisterProgress;
