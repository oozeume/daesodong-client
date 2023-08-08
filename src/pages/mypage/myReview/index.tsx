import {Stack} from 'native-base';
import React from 'react';
import MyReviewItem from '~/components/mypage/myReview/MyReviewItem';
import ListFilterHeader from '~/components/common/ListFilterHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import FlatList from '~/components/common/flatList/FlatList';

/**
 *@description 내 계정 - 내가 작성한 리뷰
 */

function MyReview() {
  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<ListFilterHeader />}
        data={['', '', '', '', '', '', '', '', '']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <MyReviewItem />}
      />
    </SafeAreaView>
  );
}

export default MyReview;
