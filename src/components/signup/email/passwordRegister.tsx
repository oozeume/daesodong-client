import React, {useState} from 'react';
import {Box} from 'native-base';
import {Platform} from 'react-native';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import _ from 'lodash';
import VerificationForm from '~/components/common/VerificationForm';
import {VerificationResult} from '~/../types/verification';

interface Props {
  handlePage: () => void;
}

const helpList = ['영문 포함', '숫자 포함', '8-20자 이내'];

/**
 *@description 이메일 회원가입 - 비밀번호 입력
 */

function PasswordRegister({handlePage}: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const hasEnglish = (text: string) => {
    const reg = /[a-zA-Z]/;
    return reg.test(text) ? 'SUCCESS' : 'FAIL';
  };

  const hasNumber = (text: string) => {
    const reg = /[0-9]/;
    return reg.test(text) ? 'SUCCESS' : 'FAIL';
  };

  const checkPasswordLength = (text: string) => {
    if (text.length > 8 && text.length < 20) {
      return 'SUCCESS';
    } else {
      return 'FAIL';
    }
  };

  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]);

  const setUpHelpResults = (text: string) => {
    if (text) {
      return setHelpResults([
        hasEnglish(text),
        hasNumber(text),
        checkPasswordLength(text),
      ]);
    }

    setHelpResults(['WARNING', 'WARNING', 'WARNING']);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setUpHelpResults(text);
  };

  const handlePasswordConfirmChange = (text: string) => {
    setPasswordConfirm(text);
  };

  return (
    <>
      <VerificationForm
        placeholder={'비밀번호 입력'}
        value={password}
        onChangeText={handlePasswordChange}
        helpList={helpList}
        marginBottom={'20px'}
        helpVerificationResults={helpResults}
        secureTextEntry
      />

      <VerificationForm
        placeholder={'비밀번호 확인'}
        value={passwordConfirm}
        onChangeText={handlePasswordConfirmChange}
        successMessage={'비밀번호가 일치합니다'}
        errorMessage={'비밀번호를 확인해주세요'}
        secureTextEntry
      />
      <Box
        w={'100%'}
        position={'absolute'}
        bottom={Platform.OS === 'android' ? '10px' : 0}>
        <Box pt={'18px'} backgroundColor={colors.grayScale[0]}>
          <Button
            large
            shadow
            text={'다음'}
            fontColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[50],
            }}
            buttonColors={{
              active: colors.fussOrange[0],
              disabled: colors.fussOrange['-30'],
            }}
            borderColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[50],
            }}
            handlePress={() => {
              handlePage();
            }}
            active={
              !_.isEmpty(password) &&
              !_.isEmpty(passwordConfirm) &&
              password === passwordConfirm
            }
          />
        </Box>
      </Box>
    </>
  );
}

export default PasswordRegister;
