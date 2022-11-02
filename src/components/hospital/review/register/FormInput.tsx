import {Box, HStack, TextArea} from 'native-base';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Label from './label';

interface Props {
  placeholder: string;
  topLabel?: string;
  bottomLabel?: string;
  isTextarea?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputBoxStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  bottomLabelStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  rightLabel?: string;
  onChangeText?: (text: string) => void;
  text?: string;
}

/**
 *@description 병원 리뷰 등록 폼 인풋
 *@param {string} topLabel - 인풋 상단 라벨
 *@param {string} bottomLabel - 인풋 하단 라벨
 *@param {boolean} isTextarea - textarea tag 사용 여부 / false면 input 태그 사용
 *@param {ViewStyle} inputContainerStyle - 최상단 컨테이너 스타일
 *@param {ViewStyle} inputBoxStyle - 인풋 바로 한 단계 위 부모 view 태그
 *@param {ViewStyle} inputStyle - input 스타일
 *@param {TextStyle} bottomLabelStyle - bottom label 스타일
 *@param {KeyboardTypeOptions} keyboardType - keyboard 입력 타입
 *@param {string} rightLabel - 인풋 하단 라벨
 */
function FormInput({
  placeholder,
  topLabel,
  bottomLabel,
  isTextarea,
  inputContainerStyle,
  inputBoxStyle,
  inputStyle,
  bottomLabelStyle,
  keyboardType,
  rightLabel,
  onChangeText,
  text,
}: Props) {
  return (
    <Box marginBottom="36px" style={inputContainerStyle}>
      {topLabel && <Label text={topLabel || ''} />}

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
          style={inputBoxStyle}>
          <TextInput
            placeholder={placeholder}
            style={[
              {
                paddingVertical: 0,
                paddingLeft: 0,
                fontSize: 15,
              },
              inputStyle,
            ]}
            keyboardType={keyboardType}
            placeholderTextColor={'#C6C8CD'}
            onChangeText={onChangeText}
            value={text}
          />
          {rightLabel && (
            <Label
              text={rightLabel}
              style={{
                fontSize: 15,
              }}
            />
          )}
        </HStack>
      )}

      {bottomLabel && (
        <Label
          style={[
            {
              marginTop: 8,
              color: '#9ea1a8',
            },
            bottomLabelStyle,
          ]}
          text={bottomLabel}
        />
      )}
    </Box>
  );
}

export default FormInput;
