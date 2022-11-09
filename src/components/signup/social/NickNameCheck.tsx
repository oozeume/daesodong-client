import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {Box} from 'native-base';

import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import {VerificationResult} from '~/../types/verification';
import VerificationForm from '~/components/common/VerificationForm';

import TermsAgreedModal from '~/components/common/modal/TermsAgreedModal';
import {EMOJI_REGEX, SPECIAL_CHARACTERS_REGEX} from '~/constants/regEx';

const helpList = ['공백 미포함', '기호 미포함', '2~10자 이내']; // 도움말 리스트

/**
 * 닉네임 중복 체크 컴포넌트
 */
function NickNameCheck() {
  const [nickName, setNickName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<VerificationResult>(); // 인증 결과
  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]); // 도움말 검증 결과

  const handleModal = () => setModalVisible(prev => !prev);

  // 닉네임 중복 검사
  const checkDuplication = () => {
    // API 연동 시 수정 필요
    Keyboard.dismiss();
    setResult('SUCCESS');
  };

  // 닉네임 글자수 검사
  const checkNickNameLength = (text: string): VerificationResult => {
    return text.length > 1 && text.length <= 10 ? 'SUCCESS' : 'FAIL';
  };

  // 닉네임 공백 검사
  const isExistBlank = (text: string): VerificationResult => {
    return text.indexOf(' ') === -1 ? 'SUCCESS' : 'FAIL';
  };

  // 닉네임 특수문자 검사
  const isExistSpecialCharacters = (text: string): VerificationResult => {
    return SPECIAL_CHARACTERS_REGEX.test(text) ? 'FAIL' : 'SUCCESS';
  };

  // 도움말 검증 결과 설정
  const setUpHelpResults = (text: string) => {
    if (text) {
      return setHelpResults([
        isExistBlank(text),
        isExistSpecialCharacters(text),
        checkNickNameLength(text),
      ]);
    }

    setHelpResults(['WARNING', 'WARNING', 'WARNING']);
  };

  const hadleNickName = (text: string) => {
    const textWithRemovedEmoji = text.replace(EMOJI_REGEX, '');
    setNickName(textWithRemovedEmoji);
    setUpHelpResults(textWithRemovedEmoji);
  };

  useEffect(() => {
    setResult('WARNING');
  }, [nickName]);

  return (
    <>
      <TermsAgreedModal visible={modalVisible} handleModal={handleModal} />
      {/* 닉네임 인증 폼 View */}
      <VerificationForm
        placeholder={'닉네임'}
        verificationResult={result}
        successMessage={'사용 가능한 닉네임입니다'}
        errorMessage={'사용할 수 없는 닉네임입니다'}
        helpList={helpList}
        helpVerificationResults={helpResults}
        value={nickName}
        marginBottom={'20px'}
        onChangeText={hadleNickName}
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
            text={'중복확인'}
            active={!helpResults.includes('FAIL')}
            handlePress={checkDuplication}
          />
        }
      />

      {/* 하단 버튼 및 이용약관, 개인정보 처리방침 View */}
      <Box
        w={'100%'}
        position={'absolute'}
        bottom={Platform.OS === 'android' ? '10px' : 0}>
        {/* 이용약관 및 개인정보 처리 방침 */}

        {/* 가입완료 버튼 */}
        <Box h={'104px'} pt={'18px'} backgroundColor={colors.grayScale[0]}>
          <Button
            large
            shadow
            text={'가입완료'}
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
            handlePress={handleModal}
            active={result === 'SUCCESS'}
          />
        </Box>
      </Box>
    </>
  );
}

export default NickNameCheck;
