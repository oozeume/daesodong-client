import {Box, HStack} from 'native-base';
import React from 'react';
import SearchIcon from '~/assets/icons/search.svg';
import {colors} from '~/theme/theme';
import {StyleSheet, TextInput} from 'react-native';

/**
 *@description 메인 페이지 상단 (이미지, 검색)
 */
function MainListHeaderView() {
  return (
    <Box>
      <Box height="375px" bgColor={colors.grayScale[20]} mb="24px" />
      {/* 검색 뷰        */}
      <Box px="18px">
        <HStack
          alignItems={'center'}
          px="16px"
          py="15px"
          bgColor={colors.grayScale[10]}
          borderRadius={8}>
          <TextInput
            placeholder="우리 아이 종 이름을 검색해보세요"
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: '400',
              color: colors.grayScale[40],
            }}
          />
          <SearchIcon style={styles.searchIcon} />
        </HStack>
      </Box>
    </Box>
  );
}

export default MainListHeaderView;

const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: 12,
  },
});
