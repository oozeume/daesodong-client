import {Box, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import Pagenation from '~/components/appIntro/AppIntroPagenation';

interface Props {
  title: string;
  pageNumber: number;
  description: string;
  imageElement: JSX.Element;
  onMove: () => void;
}

/**
 *@description 초기 앱 인트로 레이아웃
 */
function AppIntroLayout({
  title,
  pageNumber,
  description,
  imageElement,
  onMove,
}: Props) {
  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale['0']}}>
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
            {title}
          </Text>

          <Text
            fontSize="15px"
            color={colors.grayScale['60']}
            textAlign="center"
            fontWeight="400"
            lineHeight={'22px'}>
            {description}
          </Text>
        </Box>

        <Box alignItems={'center'}>{imageElement}</Box>

        <Box>
          <Pagenation pageNumber={pageNumber} />

          <RedActiveLargeButton
            active={true}
            text={'함께하기'}
            handlePress={onMove}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default AppIntroLayout;
