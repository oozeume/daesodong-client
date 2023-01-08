import React from 'react';
import FilterButton from '../contents/main/FilterButton';
import {ScrollView} from 'native-base';

/**
 *@description 컨텐츠, 커뮤니티 리스트의 카테고리 헤더
 */

function ContentsCategoryHeader() {
  return (
    <ScrollView
      pl={'18px'}
      backgroundColor={'white'}
      horizontal
      py={'8px'}
      showsHorizontalScrollIndicator={false}>
      <FilterButton name="전체" isActive onPress={() => {}} />
      <FilterButton name="설치류" onPress={() => {}} />
      <FilterButton name="포유류" onPress={() => {}} />
      <FilterButton name="파충류" onPress={() => {}} />
      <FilterButton name="조류" onPress={() => {}} />
    </ScrollView>
  );
}

export default ContentsCategoryHeader;
