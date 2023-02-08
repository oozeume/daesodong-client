import {useNavigation} from '@react-navigation/native';
import {Center, Image, Stack, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationHookProp} from '~/../types/navigator';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';

/**
 *@description 집사정보등록 - 마지막 페이지
 */

function PetInfoRegisterOutro() {
  const {reset} = useNavigation<NavigationHookProp>();

  const onMovePage = () => {
    reset({index: 0, routes: [{name: 'tab'}]});
  };
  return (
    <SafeAreaView>
      <Stack
        position={'relative'}
        px={'18px'}
        w={APP_WIDTH}
        h={APP_HEIGHT - 40}
        backgroundColor={colors.grayScale[0]}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Center pt={120}>
          <Text pb={'12px'} fontSize={'24px'} color={colors.grayScale[80]}>
            만나서 반가워요
          </Text>
          <Stack pb={'60px'}>
            <Text
              color={colors.grayScale[60]}
              fontSize={'15px'}
              textAlign={'center'}>
              봉이네님과 봉삼이가 행복하고 건강한 시간을
            </Text>
            <Text
              color={colors.grayScale[60]}
              fontSize={'15px'}
              textAlign={'center'}>
              함께할 수 있도록 대소동이 도와드릴게요
            </Text>
          </Stack>

          <Image
            width={268}
            // height={222}
            alt={'image'}
            source={require('../../../../assets/images/outro_image.png')}
          />
        </Center>

        <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
          <RedActiveLargeButton
            active
            text={'대소동 입장'}
            handlePress={onMovePage}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
}

export default PetInfoRegisterOutro;
