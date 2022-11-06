import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {
  Box,
  Center,
  KeyboardAvoidingView,
  Modal,
  Text,
  VStack,
} from 'native-base';

import Timer from '../Timer';
import Button from '../button';
import VerificationForm from '../VerificationForm';
import {VerificationResult} from '~/../types/verification';

// 숫자만 받을 수 있는 정규식
const regex = /^[0-9]+$/;

interface Props {
  visible: boolean;
  handleModal: () => void;
  handlePage?: () => void;
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
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [isTimeOver, setIsTimeOver] = useState<boolean>();
  const [result, setResult] = useState<VerificationResult>(); // 인증번호 확인 결과
  const [verificationNumber, setVerificationNumber] = useState('');

  const handleVerificationNumber = (text: string) => {
    setVerificationNumber(prev => {
      const nextCondition = regex.test(text) ? text : prev;

      return text.length === 0 ? text : nextCondition;
    });
  };

  // 인증번호 확인
  const checkVerificationNumber = () => {
    if (isTimeOver) {
      handleModal();
    } else {
      // API 연동 후 추가 작업 필요
      if (verificationNumber.length > 4) {
        setResult('FAIL');
      } else {
        setResult('SUCCESS');
        handlePage();
        handleModal();
      }
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
      <KeyboardAvoidingView>
        <Modal.Content
          maxH={'272px'}
          borderTopRadius={'28px'}
          borderBottomRadius={'none'}
          mb={0}
          mt={'auto'}>
          <VStack h={'100%'} px={'18px'}>
            {/* 인증 모달 타이틀 */}
            <Center py={'28px'}>
              <Text fontSize={18} fontWeight={'500'} color={'#383E4A'}>
                인증번호를 입력해주세요
              </Text>
            </Center>
            {/* 인증번호 입력 form */}
            <VerificationForm
              inputType={'NUMBER'}
              placeholder={'인증번호 4자리'}
              certificationResult={result}
              successMessage={'인증번호가 일치합니다'}
              errorMessage={'인증번호를 확인해주세요'}
              marginBottom={'20px'}
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
            {/* 인증번호 확인 버튼 */}
            <Box>
              <Button
                large
                shadow
                text={isTimeOver ? '닫기' : '확인'}
                fontColors={{active: '#1A1E27', disabled: '#9EA1A8'}}
                buttonColors={{active: '#FF6B00', disabled: '#FFEADC'}}
                borderColors={{active: '#1A1E27', disabled: '#9EA1A8'}}
                handlePress={checkVerificationNumber}
                active={verificationNumber.length === 4 || isTimeOver}
              />
            </Box>
          </VStack>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default VerificationModal;
