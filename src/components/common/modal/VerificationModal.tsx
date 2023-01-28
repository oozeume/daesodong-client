import React, {useEffect, useRef, useState} from 'react';
import {Platform, TextInput} from 'react-native';
import {
  Box,
  Center,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import Timer from '../Timer';
import Button from '../button';
import {colors} from '~/theme/theme';
import VerificationForm from '../VerificationForm';
import {VerificationResult} from '~/../types/verification';

import BackIcon from '../../../assets/icons/back.svg';
import {usePostAuthMobileVerifyCode} from '~/api/auth';
import {ErrorResponseTransform} from '~/../types/api/common';
import RedActiveLargeButton from '../button/RedActiveLargeButton';

// 숫자만 받을 수 있는 정규식
const regex = /^[0-9]+$/;

interface Props {
  visible: boolean;
  handleModal: () => void;
  handlePage?: () => void;
  onResendVerification: () => void;
  onVerificationFail?: () => void;
  phoneNumber: string;
}

/**
 * 인증번호 입력 모달
 * @param {boolean} visible - 모달 on/off
 * @param {() => void} handleModal - 모달 on/off 핸들러
 * @param {() => void} handlePage - 인증번호 확인 결과에 따라 페이지 이동이 필요할 경우 페이지 변경을 위한 핸들러
 */
function VerificationModal({
  visible,
  handleModal,
  handlePage = () => {},
  onVerificationFail,
  onResendVerification,
  phoneNumber,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [isTimeOver, setIsTimeOver] = useState<boolean>();
  const [result, setResult] = useState<VerificationResult>(); // 인증번호 확인 결과
  const [errorMessage, setErrorMessage] = useState('인증번호를 확인해주세요');
  const [verificationNumber, setVerificationNumber] = useState('');

  const VERIFICATION_CODE_DIGITS = 4;

  const {mutateAsync} = usePostAuthMobileVerifyCode();

  const handleVerificationNumber = (text: string) => {
    setVerificationNumber(prev => {
      const nextCondition = regex.test(text) ? text : prev;

      return text.length === 0 ? text : nextCondition;
    });
  };

  // 인증번호 확인
  const checkVerificationNumber = async () => {
    let response = null;

    if (isTimeOver) {
      handleModal();
      response = await mutateAsync({
        code: verificationNumber,
        mobile: phoneNumber,
      });
    } else {
      if (verificationNumber.length > VERIFICATION_CODE_DIGITS)
        return setResult('FAIL');

      response = await mutateAsync(
        {
          code: verificationNumber,
          mobile: phoneNumber,
        },
        {
          onError: error => {
            const errorResponse = error as ErrorResponseTransform;

            if (errorResponse?.message && errorResponse?.message !== '') {
              setResult('FAIL');
              setErrorMessage(errorResponse?.message);
            }
          },
        },
      );
    }

    if (response?.data) {
      setResult('SUCCESS');
      handlePage();
      handleModal();
    } else {
      setResult('FAIL');
      if (onVerificationFail) onVerificationFail();
    }
  };

  const handleTimeOver = () => setIsTimeOver(prev => !prev);

  useEffect(() => {
    if (visible) {
      setIsTimeOver(false);
      inputRef.current?.focus();
    }
  }, [visible]);

  return (
    <Modal isOpen={visible} size={'full'}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <Modal.Content
          w={'100%'}
          maxH={'284'}
          borderTopRadius={'28px'}
          borderBottomRadius={'none'}
          mb={0}
          mt={'auto'}>
          <VStack h={'100%'} mx={'28px'}>
            <Box maxH={'164px'}>
              {/* 인증 모달 타이틀 */}
              <Center mt={'28px'} mb={'12px'}>
                <Pressable position={'absolute'} left={0} onPress={handleModal}>
                  <BackIcon />
                </Pressable>
                <Text
                  fontSize={18}
                  fontWeight={'500'}
                  color={colors.grayScale[80]}>
                  인증번호를 입력해주세요
                </Text>
              </Center>
              {/* 인증번호 입력 form */}
              <VerificationForm
                keyboardType={'number-pad'}
                placeholder={`인증번호 ${VERIFICATION_CODE_DIGITS}자리`}
                verificationResult={result}
                successMessage={'인증번호가 일치합니다'}
                errorMessage={errorMessage}
                value={verificationNumber}
                onChangeText={handleVerificationNumber}
                inputRightElement={
                  <Timer
                    start={visible}
                    time={180}
                    handleTimeOver={handleTimeOver}
                  />
                }
                autoFocus
                inputRef={inputRef}
              />
            </Box>

            {/* 인증번호 확인 버튼 */}
            <Box h={'144px'} mt={'12px'}>
              <RedActiveLargeButton
                active={
                  verificationNumber.length === VERIFICATION_CODE_DIGITS ||
                  isTimeOver
                }
                text={isTimeOver ? '닫기' : '확인'}
                handlePress={checkVerificationNumber}
              />

              <Center mt={'20px'}>
                <Pressable
                  onPress={() => {
                    setIsTimeOver(false);
                    onResendVerification();
                  }}>
                  <Text
                    fontSize={14}
                    fontWeight={'500'}
                    color={colors.grayScale[50]}
                    textDecorationLine={'underline'}>
                    인증번호를 받지 못했어요
                  </Text>
                </Pressable>
              </Center>
            </Box>
          </VStack>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default VerificationModal;
