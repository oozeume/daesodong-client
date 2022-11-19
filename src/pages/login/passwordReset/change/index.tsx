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
import {RedActiveLargeButton} from '~/components/login/button';

interface Props {
  handlePage: () => void;
}

/**
 *@description 비밀번호 재설정 페이지
 */
function PasswordResetChange({handlePage}: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인 state

  // 비밀번호 검증폼 helpVerificationResults state
  const [passwordVerificationResult, setPasswordVerificationResult] = useState<
    VerificationResult[]
  >([undefined, undefined, undefined]);

  const onChangePassword = (text: string) => {
    // password의 영어, 숫자 포함 여부와 글자 길이 확인
    const isIncludeEnglish = INCLUDE_ENGLISH_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isIncludeNumber = INCLUDE_NUMBER_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';
    const isProperLength = RANGE_TEXT_8_20_REGREX.test(text)
      ? 'SUCCESS'
      : 'FAIL';

    setPasswordVerificationResult([
      isIncludeEnglish,
      isIncludeNumber,
      isProperLength,
    ]);
    setPassword(text);
  };

  // 확인 버튼 active 속성
  const isButtonActive =
    password === passwordConfirm && PASSWORD_REGREX.test(password);

  return (
    <VStack flex={1} justifyContent={'space-between'}>
      <VStack>
        <Text
          py="60px"
          fontSize="20px"
          color={colors.grayScale['80']}
          textAlign="center">
          변경하실 비밀번호를 입력해주세요
        </Text>

        <VerificationForm
          placeholder={'비밀번호 입력'}
          marginBottom={'12px'}
          onChangeText={onChangePassword}
          value={password}
          autoFocus
          helpList={['영문 포함', '숫자포함', '8-20자 이내']}
          helpVerificationResults={passwordVerificationResult}
          secureTextEntry
        />

        <VerificationForm
          placeholder={'비밀번호 확인'}
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
          helpList={['영문 포함', '숫자포함', '8-20자 이내']}
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
      </VStack>

      <RedActiveLargeButton
        active={isButtonActive}
        handlePress={handlePage}
        text={'확인'}
      />
    </VStack>
  );
}

export default PasswordResetChange;
