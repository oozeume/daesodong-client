import {HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import {ActiveButton} from '~/components/common/button';

/**
 *@description 패스워드 리셋 성공 페이지
 */
function PasswordResetSuccess() {
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
        <Header title="" leftButton={<BackIcon style={{left: 22}} />} />

        <VStack flex={1} justifyContent={'space-between'} px="18px" pb="40px">
          <VStack>
            <Text
              mt="80px"
              mb="12px"
              fontSize="24px"
              color="#383E4A"
              textAlign="center">
              비밀번호가 변경되었습니다.
            </Text>

            <Text fontSize="15px" color="#7F838C" textAlign="center">
              변경한 비밀번호로 로그인 해보세요
            </Text>
          </VStack>

          <ActiveButton text="로그인" onPress={() => {}} isActive />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetSuccess;
