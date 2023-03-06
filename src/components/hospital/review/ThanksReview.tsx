import {HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {
  usePostThanksCancelReview,
  usePostThanksReview,
} from '~/api/facility/mutations';
import {useGetFacilityReviews} from '~/api/facility/queries';
import HeartFillIcon from '~/assets/icons/heart_fill.svg';
import {REVIEWS_PER_PAGE} from '~/constants/facility/detail';
import Review from '~/model/facilityReview';

interface Props {
  review: Review;
}

function ThanksReview({review}: Props) {
  const [isThanks, setThanks] = useState(review.isMyThanksReview);
  const {refetch} = useGetFacilityReviews({
    facilityId: review.facilityId,
    limit: REVIEWS_PER_PAGE,
    same: false,
  });

  const onPress = () => {
    if (isThanks) {
      mutateReviewCancelThanks()
        .then(() => {
          refetch();
          setThanks(false);
        })
        .catch(e => console.log('error', e));
    } else {
      mutateReviewThanks()
        .then(() => {
          refetch();
          setThanks(true);
        })
        .catch(e => console.log('error', e));
    }
  };

  const {mutateAsync: mutateReviewThanks} = usePostThanksReview(
    review.facilityId,
    review.reviewId,
  );

  const {mutateAsync: mutateReviewCancelThanks} = usePostThanksCancelReview(
    review.facilityId,
    review.reviewId,
  );

  return (
    <HStack
      alignItems={'center'}
      space={'10px'}
      py={'20px'}
      borderTopWidth={'1'}
      borderTopColor={'#F6F7F7'}>
      <HeartFillIcon
        fill={isThanks ? '#FF6B00' : '#E1E2E4'}
        stroke={'#E1E2E4'}
        onPress={onPress}
      />
      <Text color={'grayScale.60'}>
        {review.thanksCount}마리의 친구가 고마워했어요!
      </Text>
    </HStack>
  );
}

export default ThanksReview;
