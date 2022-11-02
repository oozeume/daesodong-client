import {Button, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, Pressable} from 'react-native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import {ActiveButton, ButtonBar} from '~/components/common/button';
import FormInput from '~/components/common/FormInput';

/**
 *@description 패스워드 리셋 페이지
 */
function PasswordReset() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {height: appHeight} = Dimensions.get('screen');

  const containerPaddingTop = `${Math.floor((122 * appHeight) / 812)}px`;
  const containerPaddingBottom = `${Math.floor((40 * appHeight) / 812)}px`;
  console.log(email);
  return (
    <SafeAreaView>
      <VStack bg="#fff" w="100%" h="100%">
        <Header
          title="비밀번호 재설정"
          leftButton={<BackIcon style={{position: 'absolute', left: 22}} />}
        />

        <VStack
          mt={'77px'}
          flex={1}
          justifyContent={'space-between'}
          px="18px"
          pb="40px">
          <VStack>
            <Text pb="60px" fontSize="20px" color="#383E4A" textAlign="center">
              계정 정보를 확인할게요.
            </Text>

            <FormInput
              placeholder={'아이디(이메일)'}
              inputContainerStyle={{marginBottom: 12}}
              errorText="입력하신 계정 정보를 찾을 수 없습니다"
              onChangeText={setEmail}
              text={email}
            />

            <FormInput
              placeholder={'휴대폰 번호'}
              inputContainerStyle={{marginBottom: 20}}
              bottomLabelStyle={{
                color: '#0094FF',
                fontSize: 13,
                backgroundColor: '#FFF6D8',
              }}
              successText="인증번호가 전송되었습니다"
              isValidate="SUCCESS"
              rightNode={
                <ActiveButton
                  text={'인증하기'}
                  buttonStyle={{
                    width: 77,
                    height: 36,
                    borderRadius: 4,
                  }}
                  activeBackgroundColor="#FFD53F"
                  inactiveBackgroundColor="#FFF6D8"
                  activeBorderColor="#1A1E27"
                  inactiveBorderColor="#C6C8CD"
                  activeTextColor="#1A1E27"
                  inactiveTextColor="#C6C8CD"
                  textStyle={{fontSize: 14}}
                  onPress={() => {}}
                />
              }
              onChangeText={setPassword}
              text={password}
            />

            <FormInput
              placeholder={'인증번호 4자리'}
              inputContainerStyle={{marginBottom: 12}}
              isValidate="SUCCESS"
              successText="인증번호가 일치합니다"
              errorText="인증번호를 확인해주세요"
              onChangeText={setEmail}
              text={email}
              rightNode={
                <Text color="#F6363A" fontSize="15px">
                  03:00
                </Text>
              }
            />
          </VStack>

          <ActiveButton
            text="다음"
            onPress={() => onMove('PasswordResetChange')}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordReset;
