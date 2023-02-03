import {Text, VStack} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from '~/theme/theme';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 *@description 비밀번호 변경 성공 페이지
 */
function PasswordResetSuccess() {
  const {navigate} = useNavigation<NavigationProp<RouteList>>();

  const onMoveLoginPage = () => {
    navigate('EmailLogin');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.grayScale[0],
        flex: 1,
      }}>
      <VStack flex={1} justifyContent={'space-between'} px="18px" mb="40px">
        <VStack>
          <Text
            mt="80px"
            mb="12px"
            fontSize="24px"
            color={colors.grayScale['80']}
            textAlign="center">
            비밀번호를 변경했어요
          </Text>

          <Text
            fontSize="15px"
            color={colors.grayScale['60']}
            textAlign="center">
            변경한 비밀번호로 로그인 해보세요
          </Text>
        </VStack>

        <RedActiveLargeButton
          active
          handlePress={onMoveLoginPage}
          text={'로그인'}
        />
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetSuccess;
