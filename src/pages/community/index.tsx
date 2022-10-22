import {Box} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Community = () => {
  return (
    <SafeAreaView>
      <Box
        alignSelf="center"
        bg="primary.500"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}>
        Community Page
      </Box>
    </SafeAreaView>
  );
};

export default Community;
