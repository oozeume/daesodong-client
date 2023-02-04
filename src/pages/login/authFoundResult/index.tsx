import {Box, Center, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
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
import {useGetAuthMobile} from '~/api/auth/queries';
import _ from 'lodash';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

/**
 *@description 계정 찾기 결과 페이지
 */
function AuthFoundResult() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {params} = useRoute<RouteHookProp<'AuthFoundResult'>>();

  const {data} = useGetAuthMobile(params.phoneNumber);
  const [mainText, setMainText] = useState('');
  const [subText, setSubText] = useState('');

  // 이메일 가입 유저인지 유무 state
  const [isEmailUser, setEmailUser] = useState(false);
  const {height: appHeight} = Dimensions.get('screen');

  // 디바이스 높이에 따른 padding 설정
  const containerPaddingTop = `${Math.floor((140 * appHeight) / 812)}px`;

  const SOCIAL_TYPE: {[key: string]: string} = {
    Apple: 'Apple',
    Google: '구글',
    Kakao: '카카오',
  };

  useEffect(() => {
    if (params?.type === 'NOT_FOUND') {
      // 계정이 없을 경우,
      if (params?.previousURL === 'FOUND_EMAIL') {
        // 이전 이메일 찾기 페이지일 경우
        setSubText('회원가입하고 대소동 서비스를 이용해보세요');
      } else {
        // 이전 패스워드 찾기 페이지일 경우
        setSubText('입력하신 이메일을 확인하시거나\n회원가입을 진행해주세요');
      }

      setMainText('가입된 계정이 없어요');
    } else {
      const social = data?.data?.social;
      if (social && _.isArray(social)) {
        // 소셜 가입일 경우
        const socialText = SOCIAL_TYPE[social[0] as string];

        setMainText(`${socialText} 계정으로\n로그인하셨네요!`);
      } else {
        // 이메일 가입일 경우
        setMainText('회원님의 계정을 찾았어요');
        setEmailUser(true);
      }
      setSubText('가입했던 계정으로 로그인 해보세요');
    }
  }, [data]);

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
            mb="36px"
            fontWeight="400"
            color={colors.grayScale['60']}>
            {subText}
          </Text>

          <Box bgColor={colors.grayScale['10']} h="56px" borderRadius={18}>
            <Center>
              <Text
                color={colors.grayScale[70]}
                fontSize={'16px'}
                lineHeight={'56px'}
                fontWeight={400}>
                {data?.data.email || ''}
              </Text>
            </Center>
          </Box>
        </VStack>

        {isEmailUser ? (
          <VStack>
            <RedActiveLargeButton
              active
              text={'이메일로 로그인'}
              handlePress={() => navigate('EmailLogin')}
            />
          </VStack>
        ) : (
          <VStack>
            <KakaoLoginButton handlePress={() => {}} />
            <AppleLoginButton handlePress={() => {}} />
            <GoogleLoginButton handlePress={() => {}} />
            <EmailLoginButton handlePress={() => navigate('EmailLogin')} />
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
}

export default AuthFoundResult;
