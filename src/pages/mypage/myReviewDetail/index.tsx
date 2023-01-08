import {Box, HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReviewItem from '~/components/hospital/review/ReviewItem';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 내가 작성한 리뷰 상세
 */

function MyReviewDetail() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.grayScale[0],
        flex: 1,
      }}>
      <Stack>
        <ReviewItem
          isMyReview
          isInvisibleTag
          isInvisibleKebabMenu
          isInvisiblePetInfo
          isInvisibleBorderTop
          name={'시설 이름'}
          address={
            <Text fontSize={'13px'} color={colors.grayScale[60]}>
              서울 광진구 능동
            </Text>
          }
          visitDate={
            <HStack alignItems={'center'} space={'6px'}>
              <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />
              <Text fontSize={'13px'} color={colors.grayScale[50]}>
                YY.MM 방문
              </Text>
            </HStack>
          }
        />
        <Box
          height={'8px'}
          backgroundColor={colors.grayScale[10]}
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale[20]}
        />
      </Stack>
    </SafeAreaView>
  );
}

export default MyReviewDetail;
