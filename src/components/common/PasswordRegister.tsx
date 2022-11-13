import React, {useState} from 'react';
import {Box} from 'native-base';
import {Platform} from 'react-native';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import _ from 'lodash';
import VerificationForm from '~/components/common/VerificationForm';
import {VerificationResult} from '~/../types/verification';
import {
  INCLUDE_ENGLISH_REGREX,
  INCLUDE_NUMBER_REGREX,
  RANGE_TEXT_8_20_REGREX,
} from '~/constants/regEx';

interface Props {
  handlePage: () => void;
}

const helpList = ['영문 포함', '숫자 포함', '8-20자 이내'];

/**
 *@description 비밀번호 입력 폼
 */

function PasswordRegister({handlePage}: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]);

  const handlePasswordChange = (text: string) => {
    const isIncludeEnglish = INCLUDE_ENGLISH_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isIncludeNumber = INCLUDE_NUMBER_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isProperLength = RANGE_TEXT_8_20_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';

    setHelpResults([isIncludeEnglish, isIncludeNumber, isProperLength]);
    setPassword(text);
  };

  const handlePasswordConfirmChange = (text: string) => {
    setPasswordConfirm(text);
  };

  const isButtonActive =
    !_.isEmpty(password) &&
    !_.isEmpty(passwordConfirm) &&
    password === passwordConfirm;

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
        verificationResult={
          password.length > 0
            ? password === passwordConfirm
              ? 'SUCCESS'
              : 'FAIL'
            : undefined
        }
        secureTextEntry
      />
      <Box
        w={'100%'}
        position={'absolute'}
        pb={'20px'}
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
            active={isButtonActive}
          />
        </Box>
      </Box>
    </>
  );
}

export default PasswordRegister;
