import _ from 'lodash';
import {Button, HStack, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import HospitalReviewAllRate from '~/components/hospital/review/HospitalReviewRate';
import ReviewItem from '~/components/hospital/review/ReviewItem';
import CheckIcon from '../../../assets/icons/check.svg';

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
          <CheckIcon />
          <Text fontSize={'14px'}>우리 아이와 같은 동물 후기만</Text>
        </HStack>
      </HStack>

      <Stack space={'8px'} backgroundColor={'grayScale.10'}>
        {_.range(0, 6).map((i, index) => (
          <React.Fragment key={i.toString()}>
            <ReviewItem invisibleBorderTop={index === 0} />
          </React.Fragment>
        ))}
      </Stack>
    </ScrollView>
  );
};

export default HospitalReview;
