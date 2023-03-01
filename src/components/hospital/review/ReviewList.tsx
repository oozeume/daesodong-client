import {Stack} from 'native-base';
import React from 'react';
import Review from '~/model/faciltiyReview';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
  facilityName: string;
  facilityId: string;
}

/**
 *@description 병원 리뷰 리스트
 */

function ReviewList({reviews, facilityName, facilityId}: Props) {
  return (
    <Stack space={'8px'} backgroundColor={'grayScale.10'}>
      {reviews.map((review, index) => (
        <React.Fragment key={index.toString()}>
          <ReviewItem
            review={review}
            facilityName={facilityName}
            facilityId={facilityId}
            isInvisibleBorderTop={index === 0}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default ReviewList;
