import React, {useState} from 'react';
import {Center, KeyboardAvoidingView, Text, VStack} from 'native-base';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '~/theme/theme';
import useRegExPhone from '~/hooks/useRegExPhone';
import {NavigationHookProp} from '~/../types/navigator';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

/**
 * @description 이메일 찾기 페이지
 */
function FindEmail() {
  const navigation = useNavigation<NavigationHookProp>();
  const [phoneNumber, setPhoneNumber] = useRegExPhone();
  const [isModalOpen, setModalOpen] = useState(false);
  const postAuthMobileVerify = usePostAuthMobileVerify();

  // 인증 성공 결과 처리
  const handlePage = async () => {
    navigation.navigate('AuthFoundResult', {
      type: 'FOUND',
      previousURL: 'FOUND_EMAIL',
      phoneNumber: phoneNumber.replace(/\-/g, ''),
    });
  };

  // 모달 on/off 이벤트
  const handleModal = () => {
    Keyboard.dismiss();
    setModalOpen(prev => !prev);
  };

  // 인증 재발송 이벤트
  const onResendVerification = () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    postAuthMobileVerify.mutateAsync({
      mobile: replacePhoneNumber,
    });
  };

  // 인증하기 버튼 이벤트
  const onSendVerification = () => {
    let replacePhoneNumber = phoneNumber.replace(/\-/g, '');

    postAuthMobileVerify.mutateAsync({
      mobile: replacePhoneNumber,
    });

    setModalOpen(prev => !prev);
  };

  // 인증 실패에 대한 이벤트 로직
  const onVerificationFail = () => {
    navigation.navigate('AuthFoundResult', {
      type: 'NOT_FOUND',
      previousURL: 'FOUND_EMAIL',
    });
  };

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: colors.grayScale[0], flex: 1}}>
        <KeyboardAvoidingView
          flex={1}
          behavior={'padding'}
          keyboardVerticalOffset={40}>
          <VStack
            pt={'60px'}
            justifyContent="space-between"
            flex={1}
            px={'18px'}>
            <Center>
              <Text
                mb={'60px'}
                fontSize="20px"
                fontWeight={'500'}
                color={colors.grayScale['80']}
                textAlign="center">
                회원여부 및 계정 정보를 확인할게요
              </Text>

              <VerificationForm
                keyboardType={'number-pad'}
                placeholder={'휴대폰 번호'}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </Center>

            <VStack mb={'40px'}>
              <RedActiveLargeButton
                active={phoneNumber.length > 12}
                text={'인증번호 전송'}
                handlePress={onSendVerification}
              />
            </VStack>
          </VStack>
        </KeyboardAvoidingView>

        <VerificationModal
          visible={isModalOpen}
          handleModal={handleModal}
          handlePage={handlePage}
          onResendVerification={onResendVerification}
          onVerificationFail={onVerificationFail}
          phoneNumber={phoneNumber.replace(/\-/g, '')}
        />
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default FindEmail;
