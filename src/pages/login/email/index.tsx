import {HStack, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import {
  RedActiveLargeButton,
  AppleLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '~/components/login/button';
import EmailLoginHelperButton from '~/components/login/email/button';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';

/**
 *@description 이메일로 로그인 페이지
 */
function EmailLogin() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <VStack bg={colors.grayScale['0']} w="100%" h="100%">
        <Header
          title="이메일로 로그인"
          leftButton={
            <BackIcon
              style={{position: 'absolute', left: 18}}
              onPress={() => onMove('InitialLogin')}
            />
          }
        />

        <VStack flex={1} justifyContent={'space-between'} px="18px" mb="40px">
          <VStack>
            <VerificationForm
              placeholder={'아이디(이메일)'}
              marginBottom={'12px'}
              errorMessage="입력하신 계정 정보를 찾을 수 없습니다"
              onChangeText={setEmail}
              value={email}
              inputType="EMAIL"
              autoFocus
              verificationResult="FAIL"
            />

            <VerificationForm
              placeholder={'비밀번호'}
              marginBottom={'36px'}
              errorMessage="비밀번호를 확인해주세요"
              onChangeText={setPassword}
              value={password}
              inputType="NUMBER"
              verificationResult="FAIL"
            />

            <RedActiveLargeButton
              active={email.length > 4 && password.length > 4}
              handlePress={() => {}}
              buttonStyle={{marginBottom: 20}}
              text={'로그인'}
            />

            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <EmailLoginHelperButton onPress={() => {}} name="이메일 찾기" />

              <View w="1px" h="10px" bg={colors.grayScale['40']} />

              <EmailLoginHelperButton
                onPress={() => onMove('PasswordResetPhoneCheck')}
                name="비밀번호 재설정"
              />

              <View w="1px" h="10px" bg={colors.grayScale['40']} />

              <EmailLoginHelperButton onPress={() => {}} name="회원가입" />
            </HStack>
          </VStack>

          <VStack>
            <HStack mb="32px" alignItems="center">
              <View flex={1} h="1px" bg={colors.grayScale['20']} />

              <Text color={colors.grayScale['40']} fontSize={'14px'} px="13px">
                간편 로그인
              </Text>

              <View flex={1} h="1px" bg={colors.grayScale['20']} />
            </HStack>

            <KakaoLoginButton handlePress={() => {}} />
            <AppleLoginButton handlePress={() => {}} />
            <GoogleLoginButton handlePress={() => {}} />
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default EmailLogin;
