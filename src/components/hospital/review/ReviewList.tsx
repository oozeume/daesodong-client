import {Stack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Review from '~/model/review';
import {useUserContext} from '~/store/useUserContext';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
}

/**
 *@description 병원 리뷰 리스트
 */

function ReviewList({reviews}: Props) {
  const [userId, setUserId] = useState('');

  const userInfo = useUserContext({userId: ''});

  useEffect(() => {
    setUserId(userInfo.userId);
  }, [userInfo]);

  return (
    <Stack space={'8px'} backgroundColor={'grayScale.10'}>
      {reviews.map((review, index) => (
        <React.Fragment key={index.toString()}>
          <ReviewItem
            review={review}
            isInvisibleKebabMenu={userId === review.userId}
            isInvisibleBorderTop={index === 0}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default ReviewList;
