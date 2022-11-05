import {Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import ActiveButton from '~/components/common/ActiveButton';
import {colors} from '~/theme/theme';

/**
 *@description 비밀번호 변경 성공 페이지
 */
function PasswordResetSuccess() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

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
              color={colors.grayScale['80']}
              textAlign="center">
              비밀번호가 변경되었습니다.
            </Text>

            <Text
              fontSize="15px"
              color={colors.grayScale['60']}
              textAlign="center">
              변경한 비밀번호로 로그인 해보세요
            </Text>
          </VStack>

          <ActiveButton
            name="로그인"
            onPress={() => onMove('InitialLogin')}
            isActive
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetSuccess;
