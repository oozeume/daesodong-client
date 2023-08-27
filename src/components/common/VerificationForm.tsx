import React, {LegacyRef} from 'react';
import {Flex, HStack, Text, View, VStack} from 'native-base';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';

import {VerificationResult} from '~/../types/verification';
import {colors} from '~/theme/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  marginBottom?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  verificationResult?: VerificationResult;
  successMessage?: string;
  errorMessage?: string;
  warningMessage?: string;
  helpList?: string[];
  helpVerificationResults?: VerificationResult[];
  inputRightElement?: JSX.Element;
  autoFocus?: boolean;
  inputRef?: LegacyRef<TextInput>;
  secureTextEntry?: boolean;
  noBorderBottom?: boolean;
  maxLength?: number;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

/**
 * 인증 관련 폼
 * @param {string} value - TextInput에 들어갈 value
 * @param {(text: string) => void} onChangeText - value change 핸들러
 * @param {string} marginBottom - 하단 마진 값
 * @param {string} keyboardType - 텍스트 인풋창 타입
 * @param {string} placeholder - 텍스트 인풋창 placeholder
 * @param {VerificationResult} verificationResult - 인증 여부 (성공, 실패)
 * @param {string} successMessage - 인증 성공 메세지
 * @param {string} errorMessage - 인증 실패 메세지
 * @param {string} warningMessage - 경고 메세지
 * @param {string[]} helpList - 사용자가 입력할때 도움을 주는 도움말 리스트
 * @param {VerificationResult[]} helpVerificationResults - 도움말 검증 결과
 * @param {JSX.Element} inputRightElement - 인풋창 오른쪽에 들어갈 element
 * @param {boolean} autoFocus - 텍스트창 자동으로 보이게 하는 기능 on/off
 * @param {LegacyRef<TextInput>} inputRef - autoFocus가 작동하지 않는 경우 강제로 focus하기 위한 ref
 * @param {boolean} noBorderBottom - input border 너비
 * @param {number | undefined} maxLength - 입력 최대수
 */
function VerificationForm({
  value,
  onChangeText,
  marginBottom,
  keyboardType,
  placeholder,
  verificationResult,
  successMessage,
  errorMessage,
  warningMessage,
  helpList,
  helpVerificationResults,
  inputRightElement,
  autoFocus,
  inputRef,
  secureTextEntry,
  noBorderBottom,
  maxLength,
  onFocus,
  onBlur,
}: Props) {
  return (
    <VStack space={1} mb={marginBottom}>
      <Flex
        w={'100%'}
        h={'52px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomWidth={noBorderBottom ? 0 : '1px'}
        borderBottomColor={colors.grayScale[30]}>
        {/* 인풋창 왼쪽 TextInput */}
        <View w={'100%'}>
          <TextInput
            value={value}
            placeholderTextColor={colors.grayScale[40]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            keyboardType={keyboardType ?? 'default'}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            ref={inputRef && inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>

        {/* 인풋창 오른쪽에 들어올 element (Anything) */}
        <View alignItems={'flex-end'} position="absolute" right={0} zIndex={1}>
          {inputRightElement}
        </View>
      </Flex>

      {/* 인풋 도움말 */}
      <HStack space={3}>
        {helpList &&
          helpVerificationResults?.map((result, index) => (
            <Text
              fontSize={13}
              fontWeight={'400'}
              color={
                result === 'SUCCESS'
                  ? colors.positive[0]
                  : result === 'FAIL'
                  ? colors.negative[0]
                  : colors.grayScale[50]
              }
              key={`label_${helpList[index]}`}>
              {helpList[index]}
            </Text>
          ))}
      </HStack>

      {/* 인증 성공 or 실패 라벨 */}
      {verificationResult && (
        <Text
          color={
            verificationResult === 'SUCCESS'
              ? colors.positive[0]
              : colors.negative[0]
          }
          fontSize={13}
          fontWeight={'400'}>
          {verificationResult === 'SUCCESS'
            ? successMessage
            : verificationResult === 'FAIL'
            ? errorMessage
            : warningMessage}
        </Text>
      )}
    </VStack>
  );
}

export default VerificationForm;
