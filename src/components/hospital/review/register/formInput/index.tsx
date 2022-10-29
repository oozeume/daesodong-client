import {Box, HStack, TextArea} from 'native-base';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import Label from '../label';

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
 */
export default function FormInput({
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
    <Box style={[styles.inputBox, inputBoxStyle]}>
      <Label text={topLabel} />

      {isTextarea ? (
        <TextArea
          marginY="8px"
          h="160px"
          padding={'16px 14px'}
          fontSize="15px"
          placeholder={placeholder}
          style={inputStyle}
          autoCompleteType
          placeholderTextColor={'#C6C8CD'}
        />
      ) : (
        <HStack style={styles.inputView}>
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
  inputBox: {
    marginBottom: 36,
  },
  inputView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E1E2E4',
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 0,
    paddingLeft: 0,
    fontSize: 15,
  },
  bottomLabel: {
    color: '#9ea1a8',
  },
  rightLabel: {
    fontSize: 15,
  },
});
