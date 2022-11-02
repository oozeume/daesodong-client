import {Center, Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import TmpInitialLogin from '~/assets/images/tmp_initial_login.svg';
import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '~/components/login/button';
import {Dimensions} from 'react-native';

/**
 *@description 초기 로그인 페이지
 */
function InitialLogin() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const {height: appHeight} = Dimensions.get('screen');

  // 디바이스 높이에 따른 padding 설정
  const containerPaddingTop = `${Math.floor((78 * appHeight) / 812)}px`;
  const containerPaddingBottom = `${Math.floor((40 * appHeight) / 812)}px`;

  return (
    <SafeAreaView>
      <VStack
        bg="#fff"
        w="100%"
        h="100%"
        pt={containerPaddingTop}
        pb={containerPaddingBottom}
        px="18px"
        justifyContent={'space-between'}>
        <VStack>
          <Text fontSize="28px" color="##FF6B00" textAlign="center">
            우당탕탕
          </Text>
          <Text fontSize="28px" textAlign="center" mb="48px">
            대소동에 어서오세요!
          </Text>

          <Center>
            <TmpInitialLogin />
          </Center>
        </VStack>

        <VStack>
          <KakaoLoginButton onPress={() => {}} />
          <AppleLoginButton onPress={() => {}} />
          <GoogleLoginButton onPress={() => {}} />
          <EmailLoginButton onPress={() => onMove('EmailLogin')} />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default InitialLogin;
