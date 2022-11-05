import {Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '~/components/login/button';
import {Dimensions} from 'react-native';
import {colors} from '~/theme/theme';

/**
 *@description 휴대폰 인증 확인 시, 계정 없음 페이지
 */
function PasswordResetNotFoundAuth() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const {height: appHeight} = Dimensions.get('screen');

  // 디바이스 높이에 따른 padding 설정
  const containerPaddingTop = `${Math.floor((140 * appHeight) / 812)}px`;
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
          <Text
            fontSize="24px"
            mb="12px"
            fontWeight="500"
            color={colors.grayScale['80']}
            textAlign="center">
            가입된 계정이 없습니다
          </Text>

          <Text
            fontSize="15px"
            textAlign="center"
            mb="6px"
            fontWeight="400"
            color={colors.grayScale['60']}>
            {`입력하신 이메일을 확인하시거나`}
          </Text>

          <Text
            fontSize="15px"
            textAlign="center"
            fontWeight="400"
            color={colors.grayScale['60']}>
            회원가입을 진행해주세요
          </Text>
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

export default PasswordResetNotFoundAuth;
