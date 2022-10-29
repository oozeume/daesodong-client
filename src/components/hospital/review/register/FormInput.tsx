import {Box, HStack, TextArea} from 'native-base';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import Label from './label';

interface Props {
  placeholder: string;
  topLabel: string;
  bottomLabel?: string;
  isTextarea?: boolean;
  inputBoxStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
  rightLabel?: string;
}

/**
 *@description 병원 리뷰 등록 폼 인풋
 *@param {string} topLabel - 인풋 상단 라벨
 *@param {string} bottomLabel - 인풋 하단 라벨
 *@param {boolean} isTextarea - textarea tag 사용 여부 / false면 input 태그 사용
 *@param {ViewStyle} inputBoxStyle - 최상단 컨테이너 스타일
 *@param {ViewStyle} inputStyle - input 스타일
 *@param {KeyboardTypeOptions} keyboardType - keyboard 입력 타입
 *@param {string} rightLabel - 인풋 하단 라벨
 */
function FormInput({
  placeholder,
  topLabel,
  bottomLabel,
  isTextarea,
  inputBoxStyle,
  inputStyle,
  keyboardType,
  rightLabel,
}: Props) {
  return (
    <Box marginBottom="36px" style={inputBoxStyle}>
      <Label text={topLabel} />

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
          placeholderTextColor={'#C6C8CD'}
        />
      ) : (
        <HStack
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="#E1E2E4"
          borderBottomWidth={1}
          paddingY="15px"
          marginBottom="8px">
          <TextInput
            placeholder={placeholder}
            style={[styles.input, inputStyle]}
            keyboardType={keyboardType}
            placeholderTextColor={'#C6C8CD'}
          />
          {rightLabel && <Label text={rightLabel} style={styles.rightLabel} />}
        </HStack>
      )}

      {bottomLabel && <Label style={styles.bottomLabel} text={bottomLabel} />}
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
    paddingLeft: 0,
    fontSize: 15,
  },
  rightLabel: {
    fontSize: 15,
  },
  bottomLabel: {
    color: '#9ea1a8',
  },
});

export default FormInput;
