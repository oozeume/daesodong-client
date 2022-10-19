import {Box} from 'native-base';
import React from 'react';

const Test3 = () => {
  return (
    <Box
      alignSelf="center"
      bg="primary.500"
      _text={{
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'warmGray.50',
        letterSpacing: 'lg',
      }}>
      Hello TEST3
    </Box>
  );
};

export default Test3;
