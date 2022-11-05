import React from 'react';

import Button from '~/components/common/button';
import CertificationForm from '~/components/common/CertificationForm';
import useRegExPhone from '~/hooks/useRegExPhone';

/**
 * 휴대폰 인증 스테이지 컴포넌트
 */
function PhoneCertification() {
  const [phoneNumber, handlePhoneNumber] = useRegExPhone();

  return (
    <CertificationForm
      inputType={'TEL'}
      placeholder={'휴대폰 번호'}
      successMessage={'인증번호가 전송되었습니다'}
      errorMessage={'인증번호 전송에 실패했습니다'}
      inputValue={phoneNumber}
      onChangeHandle={handlePhoneNumber}
      inputRightElement={
        <Button
          w={'77px'}
          btnColor={'#FFD53F'}
          disabledColor={'#FFF6D8'}
          text={'인증하기'}
          active={phoneNumber.length === 13 ? true : false}
          handlePress={() => {}}
        />
      }
      autoFocus
    />
  );
}

export default PhoneCertification;
