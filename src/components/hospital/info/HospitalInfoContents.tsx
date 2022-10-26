import React from 'react';
import {Center, HStack} from 'native-base';

const HospitalInfoContents = ({children}: React.PropsWithChildren) => {
  return (
    <Center>
      <HStack
        width={337}
        borderBottomWidth={1}
        borderBottomColor={'#F6F7F7'}
        style={{paddingVertical: 24}}>
        {children}
      </HStack>
    </Center>
  );
};

export default HospitalInfoContents;
