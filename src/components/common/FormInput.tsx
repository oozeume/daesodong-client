import {Box, HStack, Text, TextArea} from 'native-base';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {InputFormValidate} from '~/../types/common/input';

interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  text?: string;
  isTextarea?: boolean;
  keyboardType?: KeyboardTypeOptions;

  inputContainerStyle?: StyleProp<ViewStyle>;
  inputBoxStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;

  topLabel?: string;
  topLabelStyle?: StyleProp<TextStyle>;
  bottomLabel?: string;
  bottomLabelStyle?: StyleProp<TextStyle>;

  rightNode?: JSX.Element;
  bottomNode?: JSX.Element;

  isValidate?: InputFormValidate;
  successText?: string;
  errorText?: string;
  errorStyle?: StyleProp<TextStyle>;
}

/**
 *@description 공통 인풋 폼
 *@param {string} placeholder - input placeholder
 *@param {(text: string) => void} onChangeText - 입력 변경 이벤트 핸들러
 *@param {string} text - 입력 text state
 *@param {boolean} isTextarea - textarea tag 사용 여부 / false면 input 태그 사용
 *@param {KeyboardTypeOptions} keyboardType - keyboard 입력 타입

 *@param {ViewStyle} inputContainerStyle - 최상단 컨테이너 스타일
 *@param {ViewStyle} inputBoxStyle - 인풋 바로 한 단계 위 부모 view 태그
 *@param {ViewStyle} inputStyle - input 스타일

 *@param {string} topLabel - 상단 라벨
 *@param {TextStyle} topLabelStyle - 상단 라벨 스타일
 *@param {string} bottomLabel - 하단 라벨
 *@param {TextStyle} bottomLabelStyle - 하단 라벨 스타일

 *@param {JSX.Element} rightNode - 인풋 우측 컴포넌트
 *@param {JSX.Element} bottomNode - 인풋 좌측 컴포넌트

 *@param isValidate - 폼 검증 여부
 *@param {string} successText - 폼 성공 텍스트
 *@param {string} errorText - 폼 에러 텍스트
 *@param {TextStyle} errorStyle - 폼 에러 텍스트 스타일
 */
function FormInput({
  placeholder,
  topLabel,
  topLabelStyle,
  bottomLabel,
  isTextarea,
  inputContainerStyle,
  inputBoxStyle,
  inputStyle,
  bottomLabelStyle,
  keyboardType,
  rightNode,
  bottomNode,
  isValidate,
  successText,
  errorText,
  errorStyle,
  onChangeText,
  text,
}: Props) {
  return (
    <Box marginBottom="36px" style={inputContainerStyle}>
      {topLabel && (
        <Text fontSize="15px" color="grayScale.70" style={topLabelStyle}>
          {topLabel}
        </Text>
      )}

      {isTextarea ? (
        <TextArea
          marginY="8px"
          h="160px"
          padding={'16px 14px'}
          fontSize="15px"
          lineHeight="22px"
          placeholder={placeholder}
          style={inputStyle}
          autoCompleteType
          placeholderTextColor={'grayScale.40'}
        />
      ) : (
        <HStack
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="grayScale.30"
          borderBottomWidth={1}
          style={inputBoxStyle}>
          <TextInput
            placeholder={placeholder}
            style={[
              {
                paddingVertical: 15,
                paddingLeft: 0,
                fontSize: 15,
              },
              inputStyle,
            ]}
            keyboardType={keyboardType}
            placeholderTextColor={'grayScale.40'}
            onChangeText={onChangeText}
            value={text}
          />
          {rightNode}
        </HStack>
      )}

      {bottomNode}

      {bottomLabel && (
        <Text
          fontSize="13px"
          color="grayScale.70"
          style={[
            {
              marginTop: 8,
              color: 'grayScale.50',
            },
            bottomLabelStyle,
          ]}>
          {bottomLabel}
        </Text>
      )}

      {successText && isValidate === 'SUCCESS' && (
        <Text fontSize="13px" color="positive.0" mt="8px" style={errorStyle}>
          {successText}
        </Text>
      )}

      {errorText && isValidate === 'ERROR' && (
        <Text fontSize="13px" color="negative.0" mt="8px" style={errorStyle}>
          {errorText}
        </Text>
      )}
    </Box>
  );
}

export default FormInput;
