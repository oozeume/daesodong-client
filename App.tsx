import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from '~/theme/theme';
import AppNavigator from './src/navigator';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {config} from '~/utils/config';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.photos.readonly'],
  webClientId:
    Platform.OS === 'android'
      ? config.GOOGLE_OAUTH_ANDROID_CLIENT_ID
      : config.GOOGLE_OAUTH_IOS_CLIENT_ID,

  offlineAccess: true,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
