import _ from 'lodash';
import {Button, Center, HStack, Text} from 'native-base';
import React from 'react';
import {VerificationResult} from '~/../types/verification';
import VerificationForm from '~/components/common/VerificationForm';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {colors} from '~/theme/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  onClose: () => void;
  title?: string;
  valueUnit?: JSX.Element;
  subText?: JSX.Element;
  placeholder?: string;
  successMessage?: string;
  errorMessage?: string;
  helpList?: string[];
  verificationResult?: VerificationResult;
  helpResults?: VerificationResult[];
}

/**
 *@description 내 계정 - 내 정보/아이 정보 - 이름 변경 컴포넌트
 */

function NameChange({
  value,
  onChangeText,
  onPress,
  onClose,
  title,
  valueUnit,
  subText,
  placeholder,
  successMessage,
  errorMessage,
  verificationResult,
  helpResults,
  helpList = [],
}: Props) {
  return (
    <>
      <Center flex={1} px={'18px'} pt={'28px'}>
        <Text
          fontSize={'18px'}
          fontWeight={'500'}
          pb={'16px'}
          color={colors.grayScale[80]}>
          {title ?? '닉네임'}
        </Text>
        {subText}
      </Center>

      <HStack mt={'24px'} width="100%">
        <VerificationForm
          placeholder={placeholder}
          verificationResult={verificationResult}
          successMessage={successMessage}
          errorMessage={errorMessage}
          helpList={helpList}
          helpVerificationResults={helpResults}
          value={value}
          marginBottom={'20px'}
          onChangeText={onChangeText}
          inputRightElement={valueUnit}
        />
      </HStack>

      <HStack mt={_.isEmpty(helpList) ? 0 : '24px'} flex={1} space={'10px'}>
        <Button
          onPress={onClose}
          width={'80px'}
          height={'52px'}
          borderColor={colors.grayScale[60]}
          borderWidth={1}
          borderRadius={'8px'}
          backgroundColor={colors.grayScale[10]}>
          <Text fontSize={'16px'} fontWeight={'500'}>
            이전
          </Text>
        </Button>

        <RedActiveLargeButton
          buttonStyle={{flex: 1}}
          active={verificationResult === 'SUCCESS'}
          text={'변경'}
          handlePress={onPress}
        />
      </HStack>
    </>
  );
}

export default NameChange;
