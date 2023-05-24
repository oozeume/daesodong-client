import {Center, Stack, Text, Image} from 'native-base';
import React from 'react';
import {HEADER_HEIGHT} from '~/constants/heights';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Button from '~/components/common/button';

interface Props {
  onPress: () => void;
}

/**
 *@description 집사정보등록 - 첫 페이지
 *@todo 추후 제거 components/signup/petInfo 폴더 내에 있는 컴포넌트
 */

function Intro({onPress}: Props) {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      position={'relative'}
      px={'18px'}
      backgroundColor={colors.grayScale[0]}
      h={APP_HEIGHT - HEADER_HEIGHT - statusbarHeight - 6}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Center pt={60}>
        <Text pb={'12px'} fontSize={'24px'} color={colors.grayScale[80]}>
          안녕하세요 봉이네님!
        </Text>
        <Stack pb={'60px'}>
          <Text
            color={colors.grayScale[60]}
            fontSize={'15px'}
            textAlign={'center'}>
            봉이네님께 딱 맞는 정보 제공을 위해
          </Text>
          <Text
            color={colors.grayScale[60]}
            fontSize={'15px'}
            textAlign={'center'}>
            쉽게 답할 수 있는 8개의 질문을 준비했어요
          </Text>
        </Stack>

        <Image
          width={196}
          height={222}
          alt={'image'}
          source={require('../../../assets/images/intro_image.png')}
        />
      </Center>

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={onPress}
          large
          active
          text={'시작'}
          fontColors={{
            active: colors.grayScale[90],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
          }}
          borderColors={{
            active: colors.grayScale[90],
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Intro;
