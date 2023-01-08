import {Stack} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import MyReviewItem from '~/components/mypage/myReview/MyReviewItem';
import ListFilterHeader from '~/components/common/ListFilterHeader';

/**
 *@description 내 계정 - 내가 작성한 리뷰
 */

function MyReview() {
  return (
    <Stack flex={1} backgroundColor={'white'}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<ListFilterHeader />}
        data={['', '', '', '', '', '', '', '', '']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <MyReviewItem />}
      />
    </Stack>
  );
}

export default MyReview;
