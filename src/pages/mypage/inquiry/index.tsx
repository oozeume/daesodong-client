import {Stack, useDisclose} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlatList from '~/components/common/flatList/FlatList';
import InquiryHeader from '~/components/mypage/inquiry/InquiryHeader';
import InquiryItem from '~/components/mypage/inquiry/InquiryItem';
import InquiryRegisterModal from '~/components/mypage/inquiry/InquiryRegisterModal';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 1:1 문의
 */

function Inquiry() {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <Stack backgroundColor={'white'}>
        <FlatList
          ListHeaderComponent={<InquiryHeader onOpenModal={onOpen} />}
          initialNumToRender={8}
          data={['', '', '']}
          renderItem={item => <InquiryItem />}
          keyExtractor={(item, index) => index.toString()}
        />

        <InquiryRegisterModal isOpen={isOpen} onClose={onClose} />
      </Stack>
    </SafeAreaView>
  );
}

export default Inquiry;
