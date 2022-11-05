import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import Button from '~/components/common/button';
import useRegExPhone from '~/hooks/useRegExPhone';
import CertificationForm from '~/components/common/CertificationForm';
import CertificationModal from '~/components/common/modal/CertificationModal';

interface Props {
  handlePage: () => void;
}

/**
 * 휴대폰 인증 스테이지 컴포넌트
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PhoneCertification({handlePage}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, handlePhoneNumber] = useRegExPhone();

  const handleModal = () => {
    Keyboard.dismiss();
    setModalVisible(prev => !prev);
  };

  return (
    <>
      <CertificationModal
        visible={modalVisible}
        handleModal={handleModal}
        handlePage={handlePage}
      />
      <CertificationForm
        inputType={'NUMBER'}
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
            handlePress={handleModal}
          />
        }
        autoFocus
      />
    </>
  );
}

export default PhoneCertification;
