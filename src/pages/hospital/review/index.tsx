import React from 'react';
import {Button, HStack, ScrollView, Stack, Text} from 'native-base';

import HospitalReviewAllRate from '~/components/hospital/review/HospitalReviewRate';
import CheckIcon from '~/assets/icons/check.svg';
import ReviewList from '~/components/hospital/review/ReviewList';

/**
 *@description 병원 리뷰 페이지
 */

const HospitalReview = () => {
  return (
    <ScrollView>
      <Stack
        space={'12px'}
        py={'20px'}
        px={'18px'}
        borderBottomColor={'grayScale.20'}
        borderBottomWidth={1}>
        <HospitalReviewAllRate />
        <Button
          w={'100%'}
          h={'44px'}
          borderRadius={'8px'}
          borderWidth={'1px'}
          borderColor={'fussOrange.0'}
          backgroundColor={'fussOrange.-40'}
          shadow={'0px 3px 4px rgba(0, 0, 0, 0.08)'}>
          <Text color={'fussOrange.0'}>리뷰쓰기</Text>
        </Button>
      </Stack>
      <HStack
        backgroundColor={'white'}
        h={'44px'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        pb={'4px'}
        px={'18px'}>
        <HStack space={'8px'}>
          <CheckIcon fill={'#FF6B00'} />
          <Text fontSize={'14px'}>우리 아이와 같은 동물 후기만</Text>
        </HStack>
      </HStack>

      <ReviewList />
    </ScrollView>
  );
};

export default HospitalReview;
