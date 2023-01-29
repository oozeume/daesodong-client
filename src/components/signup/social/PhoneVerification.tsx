import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import {SignupForm} from '~/../types/signup';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';

interface Props {
  handlePage: () => void;
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 * 휴대폰 인증 스테이지 컴포넌트
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PhoneVerification({handlePage, signupForm, setSignupForm}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const postAuthMobileVerify = usePostAuthMobileVerify();

  const handleModal = () => {
    Keyboard.dismiss();

    setModalVisible(prev => !prev);
  };

  const onResendVerification = () => {
    postAuthMobileVerify.mutateAsync({
      mobile: signupForm.mobile,
    });
  };

  const onSendVerification = async () => {
    await postAuthMobileVerify.mutateAsync({
      mobile: signupForm.mobile,
    });

    setModalVisible(prev => !prev);
  };

  const onChangeText = (text: string) =>
    setSignupForm(prevState => ({...prevState, mobile: text}));

  return (
    <>
      <VerificationModal
        visible={modalVisible}
        handleModal={handleModal}
        handlePage={handlePage}
        onResendVerification={onResendVerification}
        phoneNumber={signupForm.mobile}
      />
      <VerificationForm
        keyboardType={'number-pad'}
        placeholder={'휴대폰 번호'}
        successMessage={'인증번호가 전송되었습니다'}
        errorMessage={'인증번호 전송에 실패했습니다'}
        value={signupForm.mobile}
        marginBottom={'20px'}
        onChangeText={onChangeText}
        maxLength={11}
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
            active={signupForm.mobile.length > 10}
            handlePress={onSendVerification}
          />
        }
        autoFocus
      />
    </>
  );
}

export default PhoneVerification;
