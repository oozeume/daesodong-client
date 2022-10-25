import _ from 'lodash';
import {Button, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import ReviewItem from './review-item';
import StarRate from './star-rate';

function ReviewPage(props) {
  return (
    <ScrollView>
      <Stack
        space={'12px'}
        py={'20px'}
        px={'18px'}
        backgroundColor={'white'}
        borderBottomColor={'grayScale.20'}
        borderBottomWidth={1}>
        <StarRate />
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

      <Stack space={'8px'} backgroundColor={'grayScale.10'} py={'8px'}>
        {_.range(0, 6).map(i => (
          <React.Fragment key={i.toString()}>
            <ReviewItem />
          </React.Fragment>
        ))}
      </Stack>
    </ScrollView>
  );
}

export default ReviewPage;
