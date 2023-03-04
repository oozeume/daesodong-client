import {HStack, Stack} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FilterButton from '~/components/contents/main/FilterButton';
import {APP_WIDTH} from '~/utils/dimension';
import SavedCommunityContent from './SavedCommunityContent';

/**
 *@description 내 계정 > 저장 - 커뮤니티 Tab
 */

function MypageSaveCommunity() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const dummnyData = [0, 0, 0, 0, 0].map((item, i) => ({
    title: `Test Title${i}`,
    content: `Test Content${i}`,
    writerNickname: `Test Nick${i}`,
    writerPetInfo: {
      name: `Test petname${i}`,
      age: 10,
    },
    commentsCount: 20,
  }));

  return (
    <Stack flex={1} px={'18px'} backgroundColor={colors.grayScale[0]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
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
        renderItem={({item}) => <SavedCommunityContent contentData={item} />}
      />
    </Stack>
  );
}

export default MypageSaveCommunity;
