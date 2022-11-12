import {HStack, Text} from 'native-base';
import React from 'react';
import DeleteIcon from '~/assets/icons/delete.svg';

interface Props {
  text: string;
  onPress: () => void;
}

/**
 *@description 후기 등록, 병원 이름 컴포넌트
 *@param {string} text - 병원 이름
 */
function HospitalName({text, onPress}: Props) {
  return (
    <HStack mb="12px" alignItems="center" justifyContent="center" h="60px">
      <Text fontSize="18px">{text}</Text>

      <DeleteIcon
        onPress={onPress}
        style={{zIndex: 1, position: 'absolute', right: 18}}
      />
    </HStack>
  );
}

export default HospitalName;
