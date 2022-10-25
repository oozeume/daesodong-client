import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigator';

export const theme = extendTheme({
  colors: {
    positive: {
      '-40': '#E5F5FF',
      0: '#0094FF',
    },
    grayScale: {
      10: '#F6F7F7',
      20: '#ECECEE',
      30: '#E1E2E4',
      40: '#C6C8CD',
      50: '#9EA1A8',
      60: '#7F838C',
    },
    fussOrange: {
      '-40': '#FFF5EF',
      '-30': '#FFEADC',
      0: '#FF6B00',
    },
    fussYellow: {
      10: '#FFCC16',
    },
  },
});

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
