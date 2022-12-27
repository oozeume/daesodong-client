import React from 'react';
import {Button, ScrollView, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';

/**
 *@description 병원 리뷰 후기 작성 안내 사항 페이지
 {navigation}: StackProps<'DeveloperMenu'>
 */
function DeveloperMenu() {
  const {navigate} = useNavigation<NavigationHookProp>();

  return (
    <SafeAreaView>
      <ScrollView backgroundColor={'#fff'}>
        <VStack padding="18px" marginTop="20px">
          <Button mb="12px" onPress={() => navigate('InitialLogin')}>
            로그인 선택
          </Button>
          <Button mb="12px" onPress={() => navigate('SignUpEmail')}>
            이메일로 회원가입
          </Button>
          <Button mb="12px" onPress={() => navigate('FacilityMain')}>
            시설
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DeveloperMenu;
