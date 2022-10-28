import {NativeBaseProvider} from 'native-base';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from '~/theme/theme';

import AppNavigator from './src/navigator';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default App;
