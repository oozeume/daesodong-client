import {Text, VStack} from 'native-base';
import React from 'react';
import {NavigationHookProp, RouteHookProp} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
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
function AuthFoundResult() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {params} = useRoute<RouteHookProp<'AuthFoundResult'>>();

  const {height: appHeight} = Dimensions.get('screen');

  // 디바이스 높이에 따른 padding 설정
  const containerPaddingTop = `${Math.floor((140 * appHeight) / 812)}px`;

  let mainText = '';
  let subText = '';

  // 인증 결과 문구 입력 로직
  if (params?.type === 'NOT_FOUND') {
    if (params?.previousURL === 'FOUND_EMAIL') {
      subText = '회원가입하고 대소동 서비스를 이용해보세요';
    } else {
      subText = '입력하신 이메일을 확인하시거나\n회원가입을 진행해주세요';
    }
    mainText = '가입된 계정이 없어요';
  } else {
    subText = '가입했던 계정으로 로그인 해보세요';
    mainText = '카카오 계정으로 로그인하셨네요!';
  }

  return (
    <SafeAreaView>
      <VStack
        bg={colors.grayScale['0']}
        w="100%"
        h="100%"
        pt={containerPaddingTop}
        pb={'40px'}
        px="18px"
        justifyContent={'space-between'}>
        <VStack>
          <Text
            fontSize="24px"
            mb="12px"
            fontWeight="500"
            color={colors.grayScale['80']}
            textAlign="center">
            {mainText}
          </Text>

          <Text
            fontSize="15px"
            textAlign="center"
            mb="6px"
            fontWeight="400"
            color={colors.grayScale['60']}>
            {subText}
          </Text>
        </VStack>

        <VStack>
          <KakaoLoginButton handlePress={() => {}} />
          <AppleLoginButton handlePress={() => {}} />
          <GoogleLoginButton handlePress={() => {}} />
          <EmailLoginButton handlePress={() => navigate('EmailLogin')} />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default AuthFoundResult;