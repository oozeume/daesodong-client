import React, {LegacyRef} from 'react';
import {Flex, HStack, Text, View, VStack} from 'native-base';
import {TextInput} from 'react-native';

import {
  VerificationFormInputType,
  VerificationResult,
} from '~/../types/verification';
import {theme} from '~/theme/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  marginBottom?: string;
  inputType?: VerificationFormInputType;
  placeholder?: string;
  certificationResult?: VerificationResult;
  successMessage?: string;
  errorMessage?: string;
  warningMessage?: string;
  helperTextList?: string[];
  inputRightElement?: JSX.Element;
  autoFocus?: boolean;
  inputRef?: LegacyRef<TextInput>;
}

/**
 * 인증 관련 폼
 * @param {string} value - TextInput에 들어갈 value
 * @param {(text: string) => void} onChangeText - value change 핸들러
 * @param {string} marginBottom - 하단 마진 값
 * @param {string} inputType - 텍스트 인풋창 타입
 * @param {string} placeholder - 텍스트 인풋창 placeholder
 * @param {VerificationResult} certificationResult - 인증 여부 (성공, 실패)
 * @param {string} successMessage - 인증 성공 메세지
 * @param {string} errorMessage - 인증 실패 메세지
 * @param {string} warningMessage - 경고 메세지
 * @param {string[]} helperTextList - 사용자가 입력할때 도움을 주는 도움말 리스트
 * @param {JSX.Element} inputRightElement - 인풋창 오른쪽에 들어갈 element
 * @param {boolean} autoFocus - 텍스트창 자동으로 보이게 하는 기능 on/off
 * @param {LegacyRef<TextInput>} inputRef - autoFocus가 작동하지 않는 경우 강제로 focus하기 위한 ref
 */
function VerificationForm({
  value,
  onChangeText,
  marginBottom,
  inputType,
  placeholder,
  certificationResult,
  successMessage,
  errorMessage,
  warningMessage,
  helperTextList,
  inputRightElement,
  autoFocus,
  inputRef,
}: Props) {
  return (
    <VStack space={1} mb={marginBottom}>
      <Flex
        w={'100%'}
        h={'52px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.grayScale[30]}>
        {/* 인풋창 왼쪽 TextInput */}
        <View w={'70%'}>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            keyboardType={
              inputType === 'NUMBER'
                ? 'number-pad'
                : inputType === 'EMAIL'
                ? 'email-address'
                : 'default'
            }
            ref={inputRef && inputRef}
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
            color={
              certificationResult === 'SUCCESS'
                ? theme.colors.positive[0]
                : theme.colors.grayScale[50]
            }
            key={`label_${text}`}>
            {text}
          </Text>
        ))}
      </HStack>

      {/* 인증 성공 or 실패 라벨 */}
      {certificationResult && (
        <Text
          color={
            certificationResult === 'SUCCESS'
              ? theme.colors.positive[0]
              : theme.colors.negative[0]
          }
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

export default VerificationForm;
