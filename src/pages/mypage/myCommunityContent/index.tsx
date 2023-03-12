import {Box, HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContent from '~/components/community/detail/Content';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import ListFilterHeader from '~/components/common/ListFilterHeader';
import ListCategoryHeader from '~/components/common/ListCategoryHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommunityPost from '~/model/communityPost';

/**
 *@description 내 계정 - 내가 작성한 게시글
 */

function MyCommunityContent() {
  const dummyData = new CommunityPost({
    id: '872ac451-b9f7-427b-8482-14e382d1f728',
    userId: '0ff96524-b317-40e7-83e9-83175fb66a9e',
    title: 'Test11',
    content: 'Test11',
    thanks: 0,
    views: 43,
    kindId: '32f67806-5ba9-46bc-be7b-83a197627e9f',
    comments: 9,
    delete_at: null,
    created_at: '2023-03-01T05:35:23.439Z',
    updated_at: '2023-03-04T05:06:10.046Z',
    post_picture: [],
    kind: {
      id: '32f67806-5ba9-46bc-be7b-83a197627e9f',
      name: '설치류',
    },
    user: {
      nickname: 'test12f4',
      pets: [
        {
          name: '1234',
          age: 12,
          pet_picture_url: 'DBC23147-D981-4933-A0CE-5DFE2B501F07.jpg',
          specie: {
            name: '햄스터',
          },
        },
      ],
    },
    thanks_post_join: [],
    save_post: [],
    post_tag_join: [
      {
        post_tag: {
          id: '65fed76a-3038-457d-a06b-84a3dfebcd28',
          name: 'Test11',
        },
      },
    ],
  });

  const dummyDataList = [dummyData, dummyData];

  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[10], flex: 1}}>
      <FlatList
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <>
            <ListCategoryHeader />
            <ListFilterHeader />
          </>
        }
        data={dummyDataList}
        renderItem={({item, index}) => (
          <>
            <CommunityContent
              isVisibleTime
              isVisibleBottomUserInfo
              contentData={item}
              viewMode="simple"
            />
            <Box h="0px" bgColor={colors.grayScale[10]} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default MyCommunityContent;
