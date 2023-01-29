import React, {useState} from 'react';
import {HStack, Text, VStack} from 'native-base';
import {Keyboard, Platform, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '~/theme/theme';
import useRegExPhone from '~/hooks/useRegExPhone';
import {NavigationHookProp} from '~/../types/navigator';

import Header from '~/components/hospital/review/register/Header';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import Button from '~/components/common/button';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';

import BackIcon from '../../../assets/icons/back.svg';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';

/**
 * @description 이메일 찾기 페이지
 */
function FindEmail() {
  const navigation = useNavigation<NavigationHookProp>();
  const [phoneNumber, handlePhoneNumber] = useRegExPhone();
  const [modalVisible, setModalVisible] = useState(false);
  const postAuthMobileVerify = usePostAuthMobileVerify();

  const onMoveBack = () => navigation.goBack();

  // 인증 성공 결과 처리
  const handlePage = () =>
    navigation.navigate('AuthFoundResult', {
      type: '카카오',
      previousURL: 'FOUND_EMAIL',
    });

  // 모달 on/off 이벤트
  const handleModal = () => {
    Keyboard.dismiss();
    setModalVisible(prev => !prev);
  };

  // 인증 재발송 이벤트
  const onResendVerification = () => {
    postAuthMobileVerify.mutateAsync({
      mobile: phoneNumber,
    });
  };

  // 인증하기 버튼 이벤트
  const onSendVerification = () => {
    postAuthMobileVerify.mutateAsync({
      mobile: phoneNumber,
    });

    setModalVisible(prev => !prev);
  };

  // 인증 실패에 대한 이벤트 로직
  const onVerificationFail = () => {
    navigation.navigate('AuthFoundResult', {
      type: 'NOT_FOUND',
      previousURL: 'FOUND_EMAIL',
    });
  };

  return (
    <>
      <VerificationModal
        visible={modalVisible}
        handleModal={handleModal}
        handlePage={handlePage}
        onResendVerification={onResendVerification}
        onVerificationFail={onVerificationFail}
        phoneNumber={phoneNumber.replace(/\-/g, '')}
      />

      <TouchableWithoutView onPress={Keyboard.dismiss}>
        <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
          <HStack
            space={3}
            h={Platform.OS === 'android' ? '10%' : '8%'}
            justifyContent={'space-between'}
            backgroundColor={colors.grayScale[0]}>
            <Header
              title={'이메일 찾기'}
              leftButton={
                <Pressable
                  style={{position: 'absolute', left: 18, zIndex: 1}}
                  onPress={() => onMoveBack()}>
                  <BackIcon />
                </Pressable>
              }
            />
          </HStack>
          <VStack
            h={Platform.OS === 'android' ? '90%' : '92%'}
            pt={'60px'}
            paddingX={'18px'}>
            <Text
              w={'339px'}
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
              onChangeText={handlePhoneNumber}
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
                  text={'인증하기'}
                  active={phoneNumber.length === 13}
                  handlePress={onSendVerification}
                />
              }
              autoFocus
            />
          </VStack>
        </SafeAreaView>
      </TouchableWithoutView>
    </>
  );
}

export default FindEmail;
