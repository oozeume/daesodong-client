import React from 'react';
import {Text} from 'native-base';

import Button from '~/components/common/button';
import CertificationForm from '~/components/common/CertificationForm';

/**
 * 휴대폰 인증 스테이지 컴포넌트
 */
function PhoneCertification() {
  return (
    <>
      <CertificationForm
        placeholder={'휴대폰 번호'}
        successMessage={'인증번호가 전송되었습니다'}
        errorMessage={'인증번호 전송에 실패했습니다'}
        inputRightElement={
          <Button
            w={'77px'}
            btnColor={'#FFD53F'}
            disabledColor={'#FFF6D8'}
            text={'인증하기'}
            active={true}
            handlePress={() => {}}
          />
        }
      />
      <CertificationForm
        placeholder={'인증번호 4자리'}
        certificationResult={'FAIL'}
        successMessage={'인증번호가 일치합니다'}
        errorMessage={'인증번호를 확인해주세요'}
        inputRightElement={
          <Text fontSize={15} fontWeight={'400'} color={'#F6363A'}>
            03:00
          </Text>
        }
      />
    </>
  );
}

export default PhoneCertification;
