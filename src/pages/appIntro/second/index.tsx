import {Box, HStack, Text, View} from 'native-base';
import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {colors} from '~/theme/theme';
import Splash from '~/assets/images/splash2.svg';
import Button from '~/components/common/button';

/**
 *@description 초기 앱 인트로 설명 둘째 페이지
 */
function AppIntroSecond() {
  const {navigate} = useNavigation<NavigationHookProp>();

  const activeCircle = colors.fussOrange[0];
  const inactiveCircle = colors.scrim[60];

  const onMove = () => {
    navigate('AppIntroThird');
  };

  return (
    <SafeAreaView>
      <Box
        bg={colors.grayScale['0']}
        h="100%"
        pt={'78px'}
        pb={'40px'}
        px="18px"
        justifyContent={'space-between'}>
        <Box>
          <Text
            fontSize="20px"
            color={colors.grayScale['90']}
            textAlign="center"
            mb="12px"
            fontWeight="500">
            유용한 정보를 얻을 수 있어요
          </Text>

          <Text
            fontSize="15px"
            color={colors.grayScale['60']}
            textAlign="center"
            fontWeight="400"
            lineHeight={'22px'}>
            {`정보 얻기가 힘든 특수동물의 모든 것\n대소동에서 알려드려요`}
          </Text>
        </Box>

        <Box alignItems={'center'}>
          <Splash />
        </Box>

        <Box>
          <HStack justifyContent={'center'} mb="40px">
            <View
              width="6px"
              height="6px"
              borderRadius={6}
              bgColor={inactiveCircle}></View>
            <View
              mx="6px"
              width="6px"
              height="6px"
              borderRadius={6}
              bgColor={activeCircle}></View>
            <View
              width="6px"
              height="6px"
              borderRadius={6}
              bgColor={inactiveCircle}></View>
          </HStack>

          <Button
            large
            shadow
            text={'함께하기'}
            fontColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[50],
            }}
            buttonColors={{
              active: colors.fussOrange[0],
              disabled: colors.fussOrange['-30'],
            }}
            borderColors={{
              active: colors.grayScale[90],
              disabled: colors.grayScale[50],
            }}
            handlePress={onMove}
            active={true}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default AppIntroSecond;
