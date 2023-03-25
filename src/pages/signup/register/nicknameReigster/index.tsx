import {useNavigation} from '@react-navigation/native';
import _, {debounce} from 'lodash';
import {Box, Center, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {NavigationHookProp} from '~/../types/navigator';
import {SignupForm} from '~/../types/signup';
import {VerificationResult} from '~/../types/verification';
import {
  usePostAuthEmailSignup,
  usePostAuthNicknameCheck,
} from '~/api/auth/mutations';

import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import PrivacyPolicyModal from '~/components/common/modal/PrivacyPolicyModal';
import ServicePolicyModal from '~/components/common/modal/ServicePolicyModal';
import TermsAgreedModal from '~/components/common/modal/TermsAgreedModal';
import StageTextBox from '~/components/common/stage/StageTextBox';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import VerificationForm from '~/components/common/VerificationForm';
import {EMOJI_REGEX, SPECIAL_CHARACTERS_REGEX} from '~/constants/regEx';
import {
  EMAIL_SIGNUP_STAGE_TEXT_LIST,
  INIT_SIGNUP_TERM,
} from '~/constants/signup';
import {colors} from '~/theme/theme';
import {setSecurityData} from '~/utils/storage';
import {
  checkNicknameLength,
  isExistBlank,
  isExistSpecialCharacters,
} from '~/utils/verification';

interface Props {
  signupForm: SignupForm;
}

/**
 *@description 회원가입 > 닉네임 입력
 */
function NicknameRegister({signupForm}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const helpList = ['공백 미포함', '기호 미포함', '2-10자 이내'];
  const [term, setTerm] = useState(INIT_SIGNUP_TERM);
  const [isTermsAgreedModalOpen, setTermsAgreedModalOpen] = useState(false);

  const [policyModalOpen, setPolicyModalOpen] = useState({
    isServicePolicyModalOpen: false,
    isPrivacyPolicyModalOpen: false,
  });

  const [nickname, setNickname] = useState(signupForm.nickname);
  const [result, setResult] = useState<VerificationResult>(); // 인증 결과
  const [helpResults, setHelpResults] = useState<VerificationResult[]>([
    'WARNING',
    'WARNING',
    'WARNING',
  ]); // 도움말 검증 결과

  const postAuthSignup = usePostAuthEmailSignup();
  const postAuthNicknameCheck = usePostAuthNicknameCheck();

  const isSigunupComplete =
    helpResults[0] === 'SUCCESS' &&
    helpResults[1] === 'SUCCESS' &&
    helpResults[2] === 'SUCCESS' &&
    result === 'SUCCESS';

  // 약관 동의 후, 회원가입 api 요청 및 모달창 제어
  const onSignup = async () => {
    try {
      /**
       *@description signupForm state를 nicknameRegister 페이지 내부에서 바꾸면 모달창이 꺼지기 때문에 api 요청할 때,
       * 따로 nickname state를 선언해서 넣어준다.
       */
      const response = await postAuthSignup.mutateAsync({
        ...signupForm,
        nickname,
      });

      if (response?.success === 'SUCCESS') {
        await setSecurityData('access_token', response.data.access);
        await setSecurityData('refresh_token', response.data.refresh);

        navigate('PetInfoRegister');
      }
    } catch (error) {
      console.log(error);
    }

    setTermsAgreedModalOpen(false);
  };

  const openModal = () => {
    setTermsAgreedModalOpen(true);
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

  // 닉네임 입력 핸들러
  const onChangeNickname = (text: string) => {
    const textWithRemovedEmoji = text.replace(EMOJI_REGEX, '');
    setNickname(text);
    setUpHelpResults(textWithRemovedEmoji);
    checkNickname(text);
  };

  /**
   *@description 이용약관 설명 모달 on/off 핸들러
   *@param modalName -  ServicePolicy: 이용약관 설명 모달 오픈 / PrivacyPolicy: 개인정보 처리 설명 모달 오픈
   */
  const onPolicyModalOpen = (
    modalName: 'ServicePolicy' | 'PrivacyPolicy',
    isOpen: boolean,
  ) => {
    if (modalName === 'ServicePolicy')
      setPolicyModalOpen({
        ...policyModalOpen,
        isServicePolicyModalOpen: isOpen,
      });
    else
      setPolicyModalOpen({
        ...policyModalOpen,
        isPrivacyPolicyModalOpen: isOpen,
      });
  };

  // debounce 최적화
  const checkNickname = useMemo(
    () =>
      debounce(async text => {
        try {
          if (text.length >= 2 && text.length <= 10) {
            const response = await postAuthNicknameCheck.mutateAsync({
              nickname: text,
            });

            if (response.data) setResult('SUCCESS');
            else setResult('FAIL');
          } else {
            setResult(undefined);
          }
        } catch (error) {
          setResult('FAIL');
        }
      }, 500),
    [],
  );

  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <Box pb="40px" flex={1}>
        <VStack
          bgColor={colors.grayScale[0]}
          justifyContent="space-between"
          flex={1}>
          <Center mt={'60px'} px="18px">
            <StageTextBox
              currentStage={4}
              stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST}
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

          <VStack px="18px" mb={Platform.OS === 'android' ? '56px' : '82px'}>
            <RedActiveLargeButton
              active={isSigunupComplete}
              text={'가입 완료'}
              handlePress={openModal}
            />
          </VStack>
        </VStack>

        {/* 약관 동의 모달 */}
        <TermsAgreedModal
          onPolicyModalOpen={onPolicyModalOpen}
          term={term}
          setTerm={setTerm}
          visible={isTermsAgreedModalOpen}
          handleModal={() => setTermsAgreedModalOpen(false)}
          onSignup={onSignup}
        />

        {/* 이용약관 모달 */}
        <ServicePolicyModal
          isOpen={policyModalOpen.isServicePolicyModalOpen}
          onClose={() => onPolicyModalOpen('ServicePolicy', false)}
        />

        {/* 개인정보 보호 모달 */}
        <PrivacyPolicyModal
          isOpen={policyModalOpen.isPrivacyPolicyModalOpen}
          onClose={() => onPolicyModalOpen('PrivacyPolicy', false)}
        />
      </Box>
    </TouchableWithoutView>
  );
}

export default NicknameRegister;
