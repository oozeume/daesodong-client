import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Platform} from 'react-native';
import {Box} from 'native-base';

import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import {VerificationResult} from '~/../types/verification';
import VerificationForm from '~/components/common/VerificationForm';

import TermsAgreedModal from '~/components/common/modal/TermsAgreedModal';
import {EMOJI_REGEX, SPECIAL_CHARACTERS_REGEX} from '~/constants/regEx';
import {SignupForm} from '~/../types/login';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {useGetAuthNickname, usePostAuthEmailSignup} from '~/api/auth';
import {setSecurityData} from '~/utils/storage';

const helpList = ['공백 미포함', '기호 미포함', '2~10자 이내']; // 도움말 리스트

interface Props {
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 * 닉네임 입력 및 중복 체크 컴포넌트
 */
function NickNameRegister({signupForm, setSignupForm}: Props) {
  const navigation = useNavigation<NavigationHookProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<VerificationResult>(); // 인증 결과
  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]); // 도움말 검증 결과

  const postAuthSignup = usePostAuthEmailSignup();
  const {data, refetch} = useGetAuthNickname(signupForm.nickname);

  // 약관 동의 후, 회원가입 api 요청 및 모달창 제어
  const handleModal = async () => {
    try {
      const response = await postAuthSignup.mutateAsync(signupForm);

      /**
       * @todo 토큰 저장 로직 추가하기
       */

      if (response?.success === 'SUCCESS') {
        await setSecurityData('access_token', response.data.access);
        await setSecurityData('refresh_token', response.data.refresh);

        navigation.navigate('PetInfoRegister');
      }
    } catch (error) {
      /**
       * @description 409 이메일 존재 에러 로직 > 휴대폰 번호 확인을 했기때문에 로직 불필요.
       */
      console.log(error);
    }

    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  // 닉네임 중복 검사
  const checkDuplication = async () => {
    // API 연동 시 수정 필요
    Keyboard.dismiss();

    try {
      const response = await refetch();

      if (response.data?.data) setResult('SUCCESS');
      else setResult('FAIL');
    } catch (error) {
      setResult('FAIL');
    }
  };

  // 닉네임 글자수 검사
  const checkNicknameLength = (text: string): VerificationResult => {
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
        checkNicknameLength(text),
      ]);
    }

    setHelpResults(['WARNING', 'WARNING', 'WARNING']);
  };

  const hadleNickname = (text: string) => {
    const textWithRemovedEmoji = text.replace(EMOJI_REGEX, '');
    setSignupForm(prevState => ({
      ...prevState,
      nickname: textWithRemovedEmoji,
    }));
    setUpHelpResults(textWithRemovedEmoji);
  };

  useEffect(() => {
    setResult('WARNING');
  }, [signupForm.nickname]);

  return (
    <>
      <VerificationForm
        placeholder={'닉네임'}
        verificationResult={result}
        successMessage={'사용 가능한 닉네임입니다'}
        errorMessage={'사용할 수 없는 닉네임입니다'}
        helpList={helpList}
        helpVerificationResults={helpResults}
        value={signupForm.nickname}
        marginBottom={'20px'}
        onChangeText={hadleNickname}
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

      <Box
        w={'100%'}
        position={'absolute'}
        bottom={Platform.OS === 'android' ? '10px' : -13}>
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
            handlePress={openModal}
            active={result === 'SUCCESS'}
          />
        </Box>
      </Box>

      <TermsAgreedModal visible={modalVisible} handleModal={handleModal} />
    </>
  );
}

export default NickNameRegister;
