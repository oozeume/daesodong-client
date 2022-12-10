import {Box, FlatList, HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DownIcon from '~/assets/icons/down.svg';
import {colors} from '~/theme/theme';
import {Platform} from 'react-native';
import ContentItem from '~/components/contents/detail/ContentItem';
import KekabMenu from '~/components/common/kekab/KekabMenu';

/**
 *@description 이 시리즈의 다른 이야기 페이지
 */
const OtherContents = () => {
  const [filter, setFilter] = useState<'최신순' | '조회순' | '정렬 방법'>(
    '정렬 방법',
  );

  return (
    <SafeAreaView>
      {/* 다른 컨텐츠 리스트 뷰 */}
      <FlatList
        bgColor={colors.grayScale['0']}
        minHeight="100%"
        ListHeaderComponent={
          <Box bgColor={colors.grayScale[0]}>
            <HStack justifyContent={'space-between'} px="18px" py="16px">
              <Text
                color={colors.grayScale['70']}
                fontWeight={400}
                fontSize={13}>
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
        }
        nestedScrollEnabled
        stickyHeaderIndices={[0]}
        data={['', '', '', '', '', '', '', '', '', '', '']}
        renderItem={info => <ContentItem onPress={() => {}} {...info} />}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
};

export default OtherContents;
