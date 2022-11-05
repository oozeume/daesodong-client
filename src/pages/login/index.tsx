import {Button, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

/**
 *@description 초기 로그인 페이지
 */
function InitialLogin() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  return (
    <SafeAreaView>
      <ScrollView backgroundColor={'#fff'}>
        <VStack padding="18px" marginTop="20px">
          <Text>초기 로그인 화면</Text>
          <Button mb="12px" onPress={() => onMove('Home')}>
            홈
          </Button>
          <Button mb="12px" onPress={() => onMove('InitialLogin')}>
            로그인 선택
          </Button>
          <Button mb="12px" onPress={() => onMove('SignupEmailUserCheck')}>
            이메일로 회원가입
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InitialLogin;
