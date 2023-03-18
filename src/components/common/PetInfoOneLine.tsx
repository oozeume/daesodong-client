import {HStack, Text, View} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  fontSize?: string;
  color?: string;
  dividerColor?: string;
  textList: string[];
}

/**
 *@description 컨텐츠의 펫 한줄 정보
 */
function PetInfoOneLine({fontSize, color, dividerColor, textList}: Props) {
  return (
    <HStack alignItems={'center'}>
      {textList.map((item, i) => (
        <HStack alignItems={'center'}>
          <Text
            color={color ?? colors.grayScale[90]}
            fontSize={fontSize ?? '11px'}>
            {item}
          </Text>

          {textList.length - 1 !== i && (
            <View
              mx="4px"
              backgroundColor={dividerColor ?? colors.grayScale['80']}
              h="8px"
              w="1px"
            />
          )}
        </HStack>
      ))}
    </HStack>
  );
}

export default PetInfoOneLine;
