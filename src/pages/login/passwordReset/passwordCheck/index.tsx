import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import {VerificationResult} from '~/../types/verification';
import {
  INCLUDE_ENGLISH_REGREX,
  INCLUDE_NUMBER_REGREX,
  PASSWORD_REGREX,
  RANGE_TEXT_8_20_REGREX,
} from '~/constants/regEx';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {
  usePostAuthEmailLogin,
  usePostAuthResetPassword,
} from '~/api/auth/mutations';
import {useGetUser} from '~/api/user/queries';
import useToastShow from '~/hooks/useToast';

interface Props {
  handlePage: () => void;
  emailForm: string;
}

/**
 *@description 비밀번호 변경 > 현재 비밀번호 확인
 */
function PasswordCheck({handlePage, emailForm}: Props) {
  const {mutateAsync: onPasswordCheck} = usePostAuthEmailLogin();
  const {toastShow} = useToastShow();

  const [password, setPassword] = useState('');

  const onSubmit = () => {
    onPasswordCheck({
      email: emailForm,
      password,
    })
      .then(() => handlePage())
      .catch(error => toastShow('잘못된 비밀번호입니다.'));
  };

  return (
    <VStack flex={1} justifyContent={'space-between'}>
      <VStack>
        <Text
          py="60px"
          fontSize="20px"
          color={colors.grayScale['80']}
          textAlign="center">
          현재 사용중인 비밀번호를 입력해주세요
        </Text>

        <VerificationForm
          placeholder={'비밀번호'}
          marginBottom={'12px'}
          onChangeText={text => setPassword(text)}
          value={password}
          autoFocus
          secureTextEntry
        />
      </VStack>

      <RedActiveLargeButton
        active={password.length > 2}
        handlePress={onSubmit}
        text={'확인'}
      />
    </VStack>
  );
}

export default PasswordCheck;
