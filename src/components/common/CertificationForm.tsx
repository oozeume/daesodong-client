import React from 'react';
import {Flex, HStack, Text, View, VStack} from 'native-base';
import {TextInput} from 'react-native';

import {CertificationResult} from '~/../types/certification';

// type InputTextType = 'TEL' | 'NUMBER' | 'TEXT';

interface Props {
  placeholder?: string;
  certificationResult?: CertificationResult;
  successMessage?: string;
  errorMessage?: string;
  helperTextList?: string[];
  inputRightElement?: JSX.Element;
}

/**
 * 인증 관련 폼
 * @param {string} placeholder - 텍스트 인풋창 placeholder
 * @param {CertificationResult} certificationResult - 인증 여부 (성공, 실패)
 * @param {string} successMessage - 인증 성공 메세지
 * @param {string} errorMessage - 인증 실패 메세지
 * @param {string[]} helperTextList - 사용자가 입력할때 도움을 주는 도움말 리스트
 * @param {JSX.Element} inputRightElement - 인풋창 오른쪽에 들어갈 element
 */
function CertificationForm({
  placeholder,
  certificationResult,
  successMessage,
  errorMessage,
  helperTextList,
  inputRightElement,
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
          <TextInput placeholder={placeholder} />
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
          {certificationResult === 'SUCCESS' ? successMessage : errorMessage}
        </Text>
      )}
    </VStack>
  );
}

export default CertificationForm;
