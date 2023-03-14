import {HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContent from '~/components/community/detail/Content';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import ListFilterHeader from '~/components/common/ListFilterHeader';
import ListCategoryHeader from '~/components/common/ListCategoryHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 *@description 내 계정 - 내가 작성한 게시글
 */

function MyCommunityContent() {
  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <>
            <ListCategoryHeader />
            <ListFilterHeader />
          </>
        }
        data={['', '']}
        renderItem={({item}) => (
          <CommunityContent isVisibleTime isVisibleBottomUserInfo />
        )}
      />
    </SafeAreaView>
  );
}

export default MyCommunityContent;
