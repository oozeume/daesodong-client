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
import CertificationForm from '../CertificationForm';
import {CertificationResult} from '~/../types/certification';

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
function CertificationModal({
  visible,
  handleModal,
  handlePage = () => {},
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [isTimeOver, setIsTimeOver] = useState<boolean>();
  const [result, setResult] = useState<CertificationResult>(); // 인증번호 확인 결과
  const [certificationNumber, setCertificationNumber] = useState('');

  const handleCertificationNumber = (text: string) => {
    setCertificationNumber(prev =>
      text.length === 0 ? text : regex.test(text) ? text : prev,
    );
  };

  // 인증번호 확인
  const checkCertificationNumber = () => {
    if (isTimeOver) {
      handleModal();
    } else {
      // API 연동 후 추가 작업 필요
      if (certificationNumber.length > 4) {
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
            <CertificationForm
              inputType={'NUMBER'}
              placeholder={'인증번호 4자리'}
              certificationResult={result}
              successMessage={'인증번호가 일치합니다'}
              errorMessage={'인증번호를 확인해주세요'}
              inputValue={certificationNumber}
              onChangeHandle={handleCertificationNumber}
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
                btnColor={'#FF6B00'}
                disabledColor={'#FFEADC'}
                handlePress={checkCertificationNumber}
                active={
                  certificationNumber.length === 4 || isTimeOver ? true : false
                }
              />
            </Box>
          </VStack>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default CertificationModal;
