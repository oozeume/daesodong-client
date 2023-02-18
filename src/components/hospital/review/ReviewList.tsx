import _ from 'lodash';
import {Spinner, Stack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FacilityReviewsResponse} from '~/../types/api/facility';
import {useGetFacilityReviews} from '~/api/facility/queries';
import Review from '~/model/review';
import ReviewItem from './ReviewItem';

interface Props {
  id: string;
}

/**
 *@description 병원 리뷰 리스트
 */

function ReviewList({id}: Props) {
  const {data, isLoading} = useGetFacilityReviews({facilityId: id, limit: 10});
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (data) {
      setReviews(
        data.data.map((review: FacilityReviewsResponse) => new Review(review)),
      );
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack space={'8px'} backgroundColor={'grayScale.10'}>
      {reviews.map((review, index) => (
        <React.Fragment key={index.toString()}>
          <ReviewItem review={review} isInvisibleBorderTop={index === 0} />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default ReviewList;
