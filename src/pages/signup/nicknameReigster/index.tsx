import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Box, Center, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {SignupForm} from '~/../types/login';
import {NavigationHookProp} from '~/../types/navigator';
import {VerificationResult} from '~/../types/verification';
import {useGetAuthNickname, usePostAuthEmailSignup} from '~/api/auth';

import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import TermsAgreedModal from '~/components/common/modal/TermsAgreedModal';
import StageTextBox from '~/components/common/stage/StageTextBox';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import VerificationForm from '~/components/common/VerificationForm';
import {HEADER_HEIGHT, STAGE_BAR_HEIGHT} from '~/constants/heights';
import {EMOJI_REGEX, SPECIAL_CHARACTERS_REGEX} from '~/constants/regEx';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';
import {setSecurityData} from '~/utils/storage';

interface Props {
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 *@description 닉네임 입력
 */
function NicknameRegister({signupForm, setSignupForm}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const pageHeight = APP_HEIGHT - HEADER_HEIGHT - STAGE_BAR_HEIGHT;
  const helpList = ['공백 미포함', '기호 미포함', '2-10자 이내'];

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState<VerificationResult>(); // 인증 결과
  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]); // 도움말 검증 결과

  const postAuthSignup = usePostAuthEmailSignup();
  const {refetch} = useGetAuthNickname(nickname);

  // 약관 동의 후, 회원가입 api 요청 및 모달창 제어
  const onSignup = async () => {
    try {
      const response = await postAuthSignup.mutateAsync({
        ...signupForm,
        nickname,
      });

      /**
       * @todo 토큰 저장 로직 추가하기
       */

      if (response?.success === 'SUCCESS') {
        await setSecurityData('access_token', response.data.access);
        await setSecurityData('refresh_token', response.data.refresh);

        navigate('PetInfoRegister');
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

  useEffect(() => {
    async function test() {
      try {
        if (nickname.length >= 2 && nickname.length <= 10) {
          const response = await refetch();
          console.log('nick response');
          console.log(response);

          if (response.data?.data) setResult('SUCCESS');
          else setResult('FAIL');
        } else {
          setResult(undefined);
        }
      } catch (error) {
        setResult('FAIL');
      }
    }

    test();
  }, [nickname]);

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

  const onChangeNickname = (text: string) => {
    const textWithRemovedEmoji = text.replace(EMOJI_REGEX, '');
    setNickname(text);
    setUpHelpResults(textWithRemovedEmoji);
  };

  // useEffect(() => {
  //   setResult('WARNING');
  // }, [signupForm.nickname]);

  return (
    <>
      <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 60}>
          <Box>
            <VStack
              bgColor={colors.grayScale[0]}
              justifyContent="space-between"
              h={pageHeight}>
              <Center mt={'60px'} px="18px">
                <StageTextBox
                  totalStage={4}
                  currentStage={4}
                  stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST[3]}
                />

                <VerificationForm
                  placeholder={'닉네임'}
                  verificationResult={result}
                  successMessage={'사용 가능한 닉네임입니다'}
                  errorMessage={'이미 사용 중인 닉네임입니다'}
                  helpList={helpList}
                  helpVerificationResults={helpResults}
                  value={nickname}
                  marginBottom={'20px'}
                  onChangeText={onChangeNickname}
                />
              </Center>

              <VStack px="18px" mb={'56px'}>
                <RedActiveLargeButton
                  // active={signupForm.mobile.length > 10}
                  active
                  text={'가입 완료'}
                  handlePress={openModal}
                />
              </VStack>
            </VStack>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutView>

      <TermsAgreedModal
        visible={modalVisible}
        handleModal={() => setModalVisible(false)}
        onSignup={onSignup}
      />
    </>
  );
}

export default NicknameRegister;
