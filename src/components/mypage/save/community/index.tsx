import {HStack, Stack} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FilterButton from '~/components/contents/main/FilterButton';
import {APP_WIDTH} from '~/utils/dimension';
import CommunityContent from '~/components/community/detail/Content';
import CommunityPost from '~/model/communityPost';
import dayjs from 'dayjs';

/**
 *@description 내 계정 > 저장 - 커뮤니티 Tab
 */

function MypageSaveCommunity() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const dummnyData = [0, 0, 0, 0, 0].map((item, i) => {
    return new CommunityPost({
      title: `Test Title${i}`,
      content: `Test Content${i}`,
      created_at: dayjs().format('YYYY.MM.DD'),
      updated_at: dayjs().format('YYYY.MM.DD'),
      id: 'asdf',
      kind: {id: 'adsf', name: 'asdf'},
      kindId: 'asdf',
      post_picture: [],
      post_tag_join: [],
      user: {
        nickname: 'test',
        pets: [
          {
            name: 'test_pet',
            age: 10,
            specie: {name: '햄스터'},
          },
        ],
      },
      thanks: 0,
      userId: 'asdf',
      views: 0,
      comments: 0,
      thanks_post_join: [],
      save_post: [],
    });
  });

  return (
    <Stack flex={1} px={'18px'} backgroundColor={colors.grayScale[0]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack width={APP_WIDTH} py={'16px'} backgroundColor={'white'}>
              <FilterButton
                name="전체"
                isActive={selectedCategory === '전체'}
                onPress={() => setSelectedCategory('전체')}
              />
              <FilterButton
                name="설치류"
                isActive={selectedCategory === '설치류'}
                onPress={() => setSelectedCategory('설치류')}
              />

              <FilterButton
                name="파충류"
                isActive={selectedCategory === '파충류'}
                onPress={() => setSelectedCategory('파충류')}
              />
              <FilterButton
                name="조류"
                isActive={selectedCategory === '조류'}
                onPress={() => setSelectedCategory('조류')}
              />
            </HStack>
          </ScrollView>
        )}
        data={dummnyData}
        renderItem={({item}) => (
          <CommunityContent
            contentData={item}
            viewMode="simple"
            isVisibleBottomUserInfo
          />
        )}
      />
    </Stack>
  );
}

export default MypageSaveCommunity;
