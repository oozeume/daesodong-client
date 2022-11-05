import React from 'react';
import {Flex, HStack, Text, View, VStack} from 'native-base';
import {TextInput} from 'react-native';

import {
  CertificationFormInputType,
  CertificationResult,
} from '~/../types/certification';

interface Props {
  inputType?: CertificationFormInputType;
  placeholder?: string;
  certificationResult?: CertificationResult;
  successMessage?: string;
  errorMessage?: string;
  warningMessage?: string;
  helperTextList?: string[];
  inputValue: string;
  onChangeHandle: (text: string) => void;
  inputRightElement?: JSX.Element;
  autoFocus?: boolean;
}

/**
 * 인증 관련 폼
 * @param {string} inputType - 텍스트 인풋창 타입
 * @param {string} placeholder - 텍스트 인풋창 placeholder
 * @param {CertificationResult} certificationResult - 인증 여부 (성공, 실패)
 * @param {string} successMessage - 인증 성공 메세지
 * @param {string} errorMessage - 인증 실패 메세지
 * @param {string} warningMessage - 경고 메세지
 * @param {string[]} helperTextList - 사용자가 입력할때 도움을 주는 도움말 리스트
 * @param {string} inputValue - TextInput에 들어갈 value
 * @param {(text: string) => void} onChangeHandle - inputValue change 핸들러
 * @param {JSX.Element} inputRightElement - 인풋창 오른쪽에 들어갈 element
 * @param {boolean} autoFocus - 텍스트창 자동으로 보이게 하는 기능 on/off
 */
function CertificationForm({
  inputType,
  placeholder,
  certificationResult,
  successMessage,
  errorMessage,
  warningMessage,
  helperTextList,
  inputValue,
  onChangeHandle,
  inputRightElement,
  autoFocus,
}: Props) {
  return (
    <VStack space={1} mb={'20px'}>
      <Flex
        w={'100%'}
        h={'52px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomWidth={'1px'}
        borderBottomColor={'#E1E2E4'}>
        {/* 인풋창 왼쪽 TextInput */}
        <View w={'70%'}>
          <TextInput
            value={inputValue}
            placeholder={placeholder}
            onChangeText={text => onChangeHandle(text)}
            autoFocus={autoFocus}
            keyboardType={
              inputType === 'TEL'
                ? 'number-pad'
                : inputType === 'EMAIL'
                ? 'email-address'
                : 'default'
            }
          />
        </View>

        {/* 인풋창 오른쪽에 들어올 element (Anything) */}
        <View w={'25%'} alignItems={'flex-end'}>
          {inputRightElement}
        </View>
      </Flex>

      {/* 인풋 도움말 */}
      <HStack space={3}>
        {helperTextList?.map(text => (
          <Text
            fontSize={13}
            fontWeight={'400'}
            color={certificationResult === 'SUCCESS' ? '#0094FF' : '#9EA1A8'}
            key={`label_${text}`}>
            {text}
          </Text>
        ))}
      </HStack>

      {/* 인증 성공 or 실패 라벨 */}
      {certificationResult && (
        <Text
          color={certificationResult === 'SUCCESS' ? '#0094FF' : '#F6363A'}
          fontSize={13}
          fontWeight={'400'}>
          {certificationResult === 'SUCCESS'
            ? successMessage
            : certificationResult === 'FAIL'
            ? errorMessage
            : warningMessage}
        </Text>
      )}
    </VStack>
  );
}

export default CertificationForm;
