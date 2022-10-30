import _ from 'lodash';
import {Stack} from 'native-base';
import React from 'react';
import ReviewItem from './ReviewItem';

/**
 *@description 병원 리뷰 리스트
 */

function ReviewList() {
  return (
    <>
      <Stack space={'8px'} backgroundColor={'grayScale.10'}>
        {_.range(0, 6).map((i, index) => (
          <React.Fragment key={i.toString()}>
            <ReviewItem invisibleBorderTop={index === 0} />
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
}

export default ReviewList;
