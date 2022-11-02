import {HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import {ActiveButton} from '~/components/common/button';
import FormInput from '~/components/common/FormInput';

/**
 *@description 패스워드 리셋 페이지
 */
function PasswordResetChange() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {height: appHeight} = Dimensions.get('screen');

  const containerPaddingTop = `${Math.floor((122 * appHeight) / 812)}px`;
  const containerPaddingBottom = `${Math.floor((40 * appHeight) / 812)}px`;
  return (
    <SafeAreaView>
      <VStack bg="#fff" w="100%" h="100%">
        <Header
          title="비밀번호 재설정"
          leftButton={<BackIcon style={{left: 22}} />}
        />

        <VStack flex={1} justifyContent={'space-between'} px="18px" pb="40px">
          <VStack>
            <Text py="60px" fontSize="20px" color="#383E4A" textAlign="center">
              변경하실 비밀번호를 입력해주세요
            </Text>

            <FormInput
              placeholder={'비밀번호 입력'}
              inputContainerStyle={{marginBottom: 12}}
              errorText="입력하신 계정 정보를 찾을 수 없습니다"
              onChangeText={setPassword}
              text={password}
              bottomNode={
                <HStack mt="8px">
                  <Text color="#0094FF" fontSize="13px">
                    영문 포함
                  </Text>

                  <Text color="#0094FF" fontSize="13px" mx="16px">
                    숫자포함
                  </Text>

                  <Text color="#0094FF" fontSize="13px">
                    8-20자 이내
                  </Text>
                </HStack>
              }
            />

            <FormInput
              placeholder={'비밀번호 확인'}
              inputContainerStyle={{marginBottom: 12}}
              isValidate="SUCCESS"
              successText="비밀번호가 일치합니다"
              errorText="비밀번호를 확인해주세요"
              onChangeText={setPassword}
              text={password}
            />
          </VStack>

          <ActiveButton
            text="확인"
            onPress={() => onMove('PasswordResetSuccess')}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetChange;
