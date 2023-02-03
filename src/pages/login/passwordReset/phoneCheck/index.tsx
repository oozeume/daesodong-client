import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import useRegExPhone from '~/hooks/useRegExPhone';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {Keyboard, Platform} from 'react-native';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

interface Props {
  handlePage: () => void;
  setEmailForm: React.Dispatch<React.SetStateAction<string>>;
}

/**
 *@description 비밀번호 재설정 휴대폰 인증
 */
function PasswordResetPhoneCheck({handlePage, setEmailForm}: Props) {
  const navigation = useNavigation<NavigationHookProp>();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useRegExPhone();
  const [isModalOpen, setModalOpen] = useState(false);
  const postAuthMobileVerify = usePostAuthMobileVerify();

  // 모달 on/off 이벤트
  const handleModal = () => {
    Keyboard.dismiss();
    setModalOpen(prev => !prev);
  };

  const onSuccessHandlePage = () => {
    setEmailForm(email);
    handlePage();
  };

  // 인증 재발송 이벤트
  const onResendVerification = () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    postAuthMobileVerify.mutateAsync({
      mobile: replacePhoneNumber,
    });
  };

  // 인증하기 버튼 이벤트
  const onSendVerification = () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    postAuthMobileVerify.mutateAsync({
      mobile: replacePhoneNumber,
    });

    setModalOpen(prev => !prev);
  };

  // 인증 실패에 대한 이벤트 로직
  const onVerificationFail = () => {
    navigation.navigate('AuthFoundResult', {
      type: 'NOT_FOUND',
      previousURL: 'CHANGE_PASSWORD',
    });
  };

  return (
    <>
      <VStack pt={'60px'} flex={1} justifyContent={'space-between'}>
        <VStack>
          <Text
            pb="60px"
            fontSize="20px"
            color={colors.grayScale['80']}
            textAlign="center">
            계정 정보를 확인할게요
          </Text>

          <VerificationForm
            placeholder={'아이디(이메일)'}
            marginBottom={'12px'}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoFocus
          />

          <VerificationForm
            placeholder={'휴대폰 번호'}
            marginBottom={'20px'}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="number-pad"
          />
        </VStack>

        <RedActiveLargeButton
          active={phoneNumber.length > 12}
          text={'인증번호 전송'}
          handlePress={onSendVerification}
        />
      </VStack>

      <VerificationModal
        handlePage={onSuccessHandlePage}
        handleModal={handleModal}
        visible={isModalOpen}
        onResendVerification={onResendVerification}
        onVerificationFail={onVerificationFail}
        phoneNumber={phoneNumber.replace(/\-/g, '')}
      />
    </>
  );
}

export default PasswordResetPhoneCheck;
