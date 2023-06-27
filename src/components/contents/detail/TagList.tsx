import {Center, HStack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  list: string[];
}

/**
 *@description 컨텐츠 상세 > 태그 리스트
 *@param {string[]} list - 태그 목록
 */
const TagList = ({list}: Props) => {
  return (
    <HStack mb="8px">
      {list.map((item, i) => (
        <Center
          key={i.toString()}
          mr="6px"
          bgColor={colors.grayScale['20']}
          px="6px"
          py="1px"
          borderRadius={4}>
          <Text fontSize={'12px'} color={colors.grayScale['70']}>
            {item}
          </Text>
        </Center>
      ))}
    </HStack>
  );
};

export default TagList;
