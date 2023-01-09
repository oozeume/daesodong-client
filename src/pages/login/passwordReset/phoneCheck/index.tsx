import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import {YellowActiveSmallButton} from '~/components/login/button';
import VerificationModal from '~/components/common/modal/VerificationModal';
import useRegExPhone from '~/hooks/useRegExPhone';

interface Props {
  handlePage: () => void;
}

/**
 *@description 비밀번호 재설정 휴대폰 인증
 */
function PasswordResetPhoneCheck({handlePage}: Props) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useRegExPhone();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <VStack mt={'77px'} flex={1} justifyContent={'space-between'} pb="40px">
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
            autoFocus
            inputRightElement={
              <YellowActiveSmallButton
                active={email.length > 4 && phoneNumber.length > 4}
                text={'인증하기'}
                handlePress={() => setIsModalOpen(true)}
              />
            }
          />
        </VStack>
      </VStack>

      <VerificationModal
        handlePage={handlePage}
        handleModal={() => setIsModalOpen(prevState => !prevState)}
        visible={isModalOpen}
        onResendVerification={() => {}}
        phoneNumber={phoneNumber}
      />
    </>
  );
}

export default PasswordResetPhoneCheck;
