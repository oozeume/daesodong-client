import {Center, Image, Stack, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Button from '~/components/common/button';
import {HEADER_HEIGHT} from '~/constants/heights';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 마지막 페이지
 */

function PetInfoRegisterOutro() {
  const statusbarHeight = getStatusBarHeight();
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
          <Button
            handlePress={() => {}}
            large
            active
            shadow
            text={'대소동 입장'}
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
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
}

export default PetInfoRegisterOutro;
