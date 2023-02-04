import {Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from '~/theme/theme';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';

/**
 *@description 비밀번호 변경 성공 페이지
 */
function PasswordResetSuccess() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  return (
    <VStack flex={1} justifyContent={'space-between'}>
      <VStack>
        <Text
          mt="80px"
          mb="12px"
          fontSize="24px"
          color={colors.grayScale['80']}
          textAlign="center">
          비밀번호가 변경되었습니다.
        </Text>

        <Text fontSize="15px" color={colors.grayScale['60']} textAlign="center">
          변경한 비밀번호로 로그인 해보세요
        </Text>
      </VStack>

      <RedActiveLargeButton active handlePress={() => {}} text={'로그인'} />
    </VStack>
  );
}

export default PasswordResetSuccess;
