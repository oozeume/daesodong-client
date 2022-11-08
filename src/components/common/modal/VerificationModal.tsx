import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
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
                inputType={'NUMBER'}
                placeholder={'인증번호 4자리'}
                verificationResult={result}
                successMessage={'인증번호가 일치합니다'}
                errorMessage={'인증번호를 확인해주세요'}
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
              <Button
                large
                shadow
                text={isTimeOver ? '닫기' : '확인'}
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
                handlePress={checkVerificationNumber}
                active={verificationNumber.length === 4 || isTimeOver}
              />
              <Center mt={'20px'}>
                <Pressable>
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
