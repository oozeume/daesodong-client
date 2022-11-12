import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import useRegExPhone from '~/hooks/useRegExPhone';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';

interface Props {
  handlePage: () => void;
}

/**
 * 휴대폰 인증 스테이지 컴포넌트
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PhoneVerification({handlePage}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, handlePhoneNumber] = useRegExPhone();

  const handleModal = () => {
    Keyboard.dismiss();
    setModalVisible(prev => !prev);
  };

  return (
    <>
      <VerificationModal
        visible={modalVisible}
        handleModal={handleModal}
        handlePage={handlePage}
      />
      <VerificationForm
        keyboardType={'number-pad'}
        placeholder={'휴대폰 번호'}
        successMessage={'인증번호가 전송되었습니다'}
        errorMessage={'인증번호 전송에 실패했습니다'}
        value={phoneNumber}
        marginBottom={'20px'}
        onChangeText={handlePhoneNumber}
        inputRightElement={
          <Button
            width={'77px'}
            fontColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[40],
            }}
            buttonColors={{
              active: colors.fussYellow[0],
              disabled: colors.fussYellow['-30'],
            }}
            borderColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[40],
            }}
            text={'인증하기'}
            active={phoneNumber.length === 13}
            handlePress={handleModal}
          />
        }
        autoFocus
      />
    </>
  );
}

export default PhoneVerification;
