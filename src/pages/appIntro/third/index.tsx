import {Box, HStack, Text, View} from 'native-base';
import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {colors} from '~/theme/theme';
import Splash from '~/assets/images/splash2.svg';
import Button from '~/components/common/button';
import {setData} from '~/utils/storage';

/**
 *@description 초기 앱 인트로 설명 둘째 페이지
 */
function AppIntroThird() {
  const {reset} = useNavigation<NavigationHookProp>();

  const activeCircle = colors.fussOrange[0];
  const inactiveCircle = colors.scrim[60];

  const onMove = async () => {
    try {
      await setData('firstOpen', 'firstOpen');
      reset({index: 0, routes: [{name: 'InitialLogin'}]});
    } catch (e) {
      // error
    }
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
            내 경험을 공유해보세요
          </Text>

          <Text
            fontSize="15px"
            color={colors.grayScale['60']}
            textAlign="center"
            fontWeight="400"
            lineHeight={'22px'}>
            {`내가 겪은 경험을 공유하고 다른 동물들을 도와\n고마운 마음을 모아보세요`}
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
              bgColor={inactiveCircle}></View>
            <View
              width="6px"
              height="6px"
              borderRadius={6}
              bgColor={activeCircle}></View>
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

export default AppIntroThird;
