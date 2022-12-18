import {HStack, Text, View} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  fontSize?: string;
  color?: string;
  dividerColor?: string;
  petName?: string;
  petType?: string;
  petGender?: string;
  petAge?: string;
}

/**
 *@description 컨텐츠의 펫 한줄 정보
 */
function PetInfoOneLine({
  fontSize,
  color,
  dividerColor,
  petName,
  petType,
  petGender,
  petAge,
}: Props) {
  return (
    <HStack alignItems={'center'} space="4px">
      {petName && (
        <>
          <Text
            color={color ?? colors.grayScale[90]}
            fontSize={fontSize ?? '11px'}>
            닉네임
          </Text>
          <View
            backgroundColor={dividerColor ?? colors.grayScale['80']}
            h="8px"
            w="1px"
          />
        </>
      )}

      {petType && (
        <>
          <Text
            color={color ?? colors.grayScale[90]}
            fontSize={fontSize ?? '11px'}>
            골든햄스터
          </Text>
          <View
            backgroundColor={dividerColor ?? colors.grayScale['80']}
            h="8px"
            w="1px"
          />
        </>
      )}

      {petGender && (
        <>
          <Text
            color={color ?? colors.grayScale[90]}
            fontSize={fontSize ?? '11px'}>
            남아
          </Text>
          <View
            backgroundColor={dividerColor ?? colors.grayScale['80']}
            h="8px"
            w="1px"
          />
        </>
      )}

      {petAge && (
        <Text
          color={color ?? colors.grayScale[90]}
          fontSize={fontSize ?? '11px'}>
          2개월
        </Text>
      )}
    </HStack>
  );
}

export default PetInfoOneLine;
