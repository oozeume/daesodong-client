import {HStack, Square, Stack, Text, View} from 'native-base';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import FilterButton from '~/components/contents/main/FilterButton';
import {colors} from '~/theme/theme';
import ViewFillICon from '~/assets/icons/view_fill.svg';
import BookmarkFillIcon from '~/assets/icons/bookmark_fill_14.svg';
import {StyleSheet} from 'react-native';
import {APP_WIDTH} from '~/utils/dimension';
import FlatList from '~/components/common/flatList/FlatList';

/**
 *@description 내 계정 > 저장 - 콘텐츠 Tab
 */

function MypageSaveContents() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  return (
    <FlatList
      style={styles.container}
      data={['', '', '', '']}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack
            width={APP_WIDTH}
            backgroundColor={'white'}
            px={'18px'}
            py={'16px'}>
            <FilterButton
              name="전체"
              isActive={selectedCategory === '전체'}
              onPress={() => setSelectedCategory('전체')}
            />
            <FilterButton
              name="대소동 이야기"
              isActive={selectedCategory === '대소동 이야기'}
              onPress={() => setSelectedCategory('대소동 이야기')}
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
          </HStack>
        </ScrollView>
      )}
      renderItem={() => (
        <HStack
          backgroundColor={colors.grayScale[10]}
          height={'92px'}
          mx={'18px'}
          mb={'8px'}>
          <Square
            width={'92px'}
            height={'92px'}
            backgroundColor={colors.grayScale[20]}
          />
          <Stack p={'12px'} flex={1}>
            <Text
              mb={'2px'}
              noOfLines={1}
              fontSize={'12px'}
              color={colors.grayScale[70]}>
              카테고리
            </Text>
            <Text
              mb={'12px'}
              noOfLines={1}
              fontSize={'15px'}
              fontWeight={'500'}
              color={colors.grayScale[70]}>
              제목 텍스트를 입력하세요
            </Text>
            <HStack alignItems={'center'} space={'16px'}>
              <HStack space={'4px'} alignItems={'center'}>
                <ViewFillICon fill={colors.grayScale[40]} />
                <Text fontSize={'12px'} color={colors.grayScale[50]}>
                  100
                </Text>
              </HStack>

              <HStack space={'4px'} alignItems={'center'}>
                <BookmarkFillIcon />
                <Text fontSize={'12px'} color={colors.grayScale[50]}>
                  100
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </HStack>
      )}
    />
  );
}

export default MypageSaveContents;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
