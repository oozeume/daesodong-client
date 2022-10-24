import React from 'react';
import {Box, Button} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeProps = NativeStackScreenProps<ParamListBase, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  return (
    <SafeAreaView>
      <Box
        margin={12}
        alignSelf="center"
        bg="primary.500"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}>
        Home
      </Box>
      <Button
        onPress={() => navigation.navigate('Hospital')}
        alignSelf="center"
        bg="primary.500"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}>
        Move To Hospital Screen
      </Button>
    </SafeAreaView>
  );
};

export default Home;
