import {HStack, Text} from 'native-base';
import React from 'react';
import IconHome from '~/assets/icons/home.svg';

interface Props {
  text: string;
}
function HospitalName({text}: Props) {
  return (
    <HStack
      backgroundColor="#f6f7f7"
      marginBottom="24px"
      alignItems="center"
      justifyContent="center"
      padding="18px 0px">
      <IconHome style={{marginRight: 6}} />
      <Text fontSize="16">{text}</Text>
    </HStack>
  );
}

export default HospitalName;
