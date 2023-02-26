import {Box, Divider, HStack, Stack, Text, View} from 'native-base';
import React, {useState} from 'react';
import CommunityContent from '~/components/community/detail/Content';
import {colors} from '~/theme/theme';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FilterButton from '~/components/contents/main/FilterButton';
import {APP_WIDTH} from '~/utils/dimension';

/**
 *@description 내 계정 - 커뮤니티 Tab
 */

function Index() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
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
        data={['', '', '', '']}
        renderItem={() => (
          <CommunityContent viewMode={'simple'} isVisibleBottomUserInfo />
        )}
      />
    </Stack>
  );
}

export default Index;
