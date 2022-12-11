import {Box, HStack, ScrollView, Text} from 'native-base';
import React, {useState} from 'react';
import DownIcon from '~/assets/icons/down.svg';
import {colors} from '~/theme/theme';
import {Platform} from 'react-native';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import FilterButton from '~/components/contents/main/FilterButton';

/**
 *@description 메인 페이지 상단 고정 뷰
 */
function MainListStickyView() {
  const [filter, setFilter] = useState<'최신순' | '조회순' | '정렬 방법'>(
    '정렬 방법',
  );

  return (
    <Box bgColor={colors.grayScale[0]} pt="24px">
      {/* 필터 뷰 */}
      <Box pl="18px">
        <ScrollView horizontal mb="8px" showsHorizontalScrollIndicator={false}>
          <FilterButton name="전체" isActive onPress={() => {}} />
          <FilterButton name="대소동 이야기" isActive onPress={() => {}} />
          <FilterButton name="설치류" isActive onPress={() => {}} />
          <FilterButton name="포유류" isActive onPress={() => {}} />
          <FilterButton name="파충류" isActive onPress={() => {}} />
          <FilterButton name="대소동 이야기" isActive onPress={() => {}} />
          <FilterButton name="설치류" isActive onPress={() => {}} />
          <FilterButton name="포유류" isActive onPress={() => {}} />
          <FilterButton name="파충류" isActive onPress={() => {}} />
        </ScrollView>
      </Box>

      {/* 상단 필터 뷰 */}
      <Box>
        <HStack justifyContent={'space-between'} px="18px" py="16px">
          <Text color={colors.grayScale['70']} fontWeight={400} fontSize={13}>
            총 <Text fontWeight={700}>100</Text> 개의 검색결과
          </Text>

          <KekabMenu
            top={Platform.OS === 'android' ? '40px' : '14px'}
            left={'-3px'}
            handleFirstButton={() => setFilter('최신순')}
            handleSecondButton={() => setFilter('조회순')}
            firstButtonName="최신순"
            secondButtonName="조회순"
            kekabElement={
              <HStack>
                <Text
                  mr="2px"
                  color={colors.grayScale['80']}
                  fontWeight={400}
                  fontSize={13}>
                  {filter}
                </Text>
                <DownIcon />
              </HStack>
            }
          />
        </HStack>
      </Box>
    </Box>
  );
}

export default MainListStickyView;
