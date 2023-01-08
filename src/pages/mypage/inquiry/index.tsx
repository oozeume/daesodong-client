import {Stack} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import InquiryHeader from '~/components/mypage/inquiry/InquiryHeader';
import InquiryItem from '~/components/mypage/inquiry/InquiryItem';

/**
 *@description 내 계정 - 1:1 문의
 */

function Inquiry() {
  return (
    <Stack flex={1} backgroundColor={'white'}>
      <FlatList
        ListHeaderComponent={<InquiryHeader />}
        initialNumToRender={8}
        data={['', '', '']}
        renderItem={item => <InquiryItem />}
        keyExtractor={(item, index) => index.toString()}
      />
    </Stack>
  );
}

export default Inquiry;
