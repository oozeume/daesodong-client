import {Stack, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 알림 detail 페이지
 */

function NoticeDetail() {
  return (
    <ScrollView>
      <Stack
        alignItems={'center'}
        height={'426px'}
        backgroundColor={colors.fussYellow['-40']}>
        <Text
          fontWeight={'500'}
          lineHeight={'44px'}
          fontSize={'36px'}
          color={colors.grayScale[90]}>
          골든햄스터
        </Text>
        <Text pt={'4px'} color={colors.grayScale[80]} fontSize={'16px'}>
          친구야 반가워!
        </Text>
      </Stack>

      <Stack backgroundColor={colors.grayScale[0]}>
        <Stack px={'18px'} py={'28px'} space={'22px'}>
          <Text
            fontWeight={'700'}
            fontSize={'18px'}
            color={colors.grayScale[80]}>
            Q. 친구소개
          </Text>
          <Text
            fontSize={'15px'}
            color={colors.grayScale[70]}
            lineHeight={'22px'}>
            무성할 하나에 비둘기, 없이 멀리 라이너 별에도 계십니다. 불러 이름과,
            이국 토끼, 묻힌 프랑시스 까닭입니다. 한 새워 노루, 나는 애기 쉬이
            많은 버리었습니다. 가난한 차 밤이 어머님, 흙으로 피어나듯이 이름을
            봅니다. 어머님, 노새, 어머님, 써 걱정도 패, 멀리 별 있습니다.
          </Text>
        </Stack>

        <Stack
          px={'18px'}
          py={'28px'}
          space={'22px'}
          backgroundColor={colors.grayScale[0]}>
          <Text
            fontWeight={'700'}
            fontSize={'18px'}
            color={colors.grayScale[80]}>
            Q. 친구소개
          </Text>
          <Text
            fontSize={'15px'}
            color={colors.grayScale[70]}
            lineHeight={'22px'}>
            무성할 하나에 비둘기, 없이 멀리 라이너 별에도 계십니다. 불러 이름과,
            이국 토끼, 묻힌 프랑시스 까닭입니다. 한 새워 노루, 나는 애기 쉬이
            많은 버리었습니다. 가난한 차 밤이 어머님, 흙으로 피어나듯이 이름을
            봅니다. 어머님, 노새, 어머님, 써 걱정도 패, 멀리 별 있습니다.
          </Text>
        </Stack>
      </Stack>
    </ScrollView>
  );
}

export default NoticeDetail;
