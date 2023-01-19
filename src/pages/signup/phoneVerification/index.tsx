import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import {usePostAuthMobileVerify} from '~/api/auth';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {APP_HEIGHT} from '~/utils/dimension';
import {HEADER_HEIGHT, STAGE_BAR_HEIGHT} from '~/constants/heights';
import {Box, Center, VStack} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import useRegExPhone from '~/hooks/useRegExPhone';
import {SignupForm} from '~/../types/signup';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<SignupNavigatorRouteList[]>
  >;
  signupForm: SignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

/**
 * 회원 가입 > 휴대폰 인증 페이지
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function PhoneVerification({
  onChangeStage,
  setPreviousURL,
  signupForm,
  setSignupForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const pageHeight = APP_HEIGHT - HEADER_HEIGHT - STAGE_BAR_HEIGHT;

  const [phoneNumber, setPhoneNumber] = useRegExPhone();
  const [modalVisible, setModalVisible] = useState(false);
  const postAuthMobileVerify = usePostAuthMobileVerify();

  // 모달 제어
  const onHandleModal = () => {
    Keyboard.dismiss();
    setModalVisible(prev => !prev);
  };

  // 모달 컴포넌트에서 페이지 제어 핸들러
  const onHandlePage = () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    onChangeStage();
    setSignupForm(prev => ({...prev, mobile: replacePhoneNumber}));
    setPreviousURL(prev => [...prev, 'PhoneVerification']);
    navigate('EmailRegister');
  };

  // 인증 메세지 재전송 핸들러
  const onResendVerification = () => {
    postAuthMobileVerify.mutateAsync({
      mobile: signupForm.mobile,
    });
  };

  /**
   *@description 인증 번호 발송 및 인증 모달창 오픈
   */
  const onSendVerification = async () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    await postAuthMobileVerify.mutateAsync({
      mobile: replacePhoneNumber,
    });

    setModalVisible(prev => !prev);
    // onHandlePage();
  };

  const onChangeText = (text: string) => {
    setPhoneNumber(text);
  };

  useEffect(() => {
    if (signupForm.mobile) setPhoneNumber(signupForm.mobile);
  }, []);

  return (
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
                currentStage={1}
                stageTextList={EMAIL_SIGNUP_STAGE_TEXT_LIST[0]}
              />

              <VerificationForm
                keyboardType={'number-pad'}
                placeholder={'휴대폰 번호'}
                successMessage={'인증번호가 전송되었습니다'}
                errorMessage={'인증번호 전송에 실패했습니다'}
                value={phoneNumber}
                marginBottom={'20px'}
                onChangeText={onChangeText}
                maxLength={13}
                autoFocus
              />
            </Center>

            <VStack px="18px" mb={'56px'}>
              <RedActiveLargeButton
                active={phoneNumber.length > 12}
                text={'인증번호 발송'}
                handlePress={onSendVerification}
              />
            </VStack>
          </VStack>

          <VerificationModal
            visible={modalVisible}
            handleModal={onHandleModal}
            handlePage={onHandlePage}
            onResendVerification={onResendVerification}
            phoneNumber={phoneNumber.replace(/\-/g, '')}
          />
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutView>
  );
}

export default PhoneVerification;
