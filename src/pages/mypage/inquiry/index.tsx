import {Stack} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryHeader from '~/components/mypage/inquiry/InquiryHeader';
import InquiryItem from '~/components/mypage/inquiry/InquiryItem';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 1:1 문의
 */

function Inquiry() {
  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <Stack backgroundColor={'white'}>
        <FlatList
          ListHeaderComponent={<InquiryHeader />}
          initialNumToRender={8}
          data={['', '', '']}
          renderItem={item => <InquiryItem />}
          keyExtractor={(item, index) => index.toString()}
        />
      </Stack>
    </SafeAreaView>
  );
}

export default Inquiry;
