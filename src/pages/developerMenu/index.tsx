import {Button, ScrollView, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp, RouteList} from '~/../types/navigator';

/**
 *@description 병원 리뷰 후기 작성 안내 사항 페이지
 {navigation}: StackProps<'DeveloperMenu'>
 */
function DeveloperMenu() {
  const navigation = useNavigation<NavigationHookProp>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  return (
    <SafeAreaView>
      <ScrollView backgroundColor={'#fff'}>
        <VStack padding="18px" marginTop="20px">
          <Button mb="12px" onPress={() => onMove('Hospital')}>
            병원정보
          </Button>
          <Button mb="12px" onPress={() => onMove('InitialLogin')}>
            로그인 선택
          </Button>
          <Button mb="12px" onPress={() => onMove('SignUpEmail')}>
            이메일로 회원가입
          </Button>
          <Button mb="12px" onPress={() => onMove('SignupSocial')}>
            소셜 회원가입
          </Button>
          <Button mb="12px">아이디</Button>
          <Button mb="12px">비밀번호 재설정</Button>
          <Button mb="12px" onPress={() => onMove('PetInfoRegister')}>
            집사정보/반려동물 등록
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DeveloperMenu;
