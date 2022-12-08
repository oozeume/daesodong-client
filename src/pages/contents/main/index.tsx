import {Box, HStack, ScrollView, Text, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '~/assets/icons/search.svg';
import DownIcon from '~/assets/icons/down.svg';
import FloatingButtonImage from '~/assets/images/floating_button_image.svg';
import TooltipImage from '~/assets/images/tooltip_image.svg';

import {colors} from '~/theme/theme';
import {Platform, StyleSheet, TextInput} from 'react-native';
import ContentItem from '~/components/contents/detail/ContentItem';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import FilterButton from '~/components/contents/main/FilterButton';
import ReviewPopup from '~/components/contents/detail/ReviewPopup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlatList} from 'react-native-gesture-handler';

/**
 *@description 컨텐츠 메인 페이지
 */
const ContentsMain = () => {
  const [isTooltipOpen, setTooltipOpen] = useState(true);
  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 '무엇이 아쉬웠나요' 리뷰 모달 on/off 훅

  const [filter, setFilter] = useState<'최신순' | '조회순' | '정렬 방법'>(
    '정렬 방법',
  );

  useEffect(() => {
    setTimeout(() => {
      // 4초 후, 다음 콘텐츠로 보고 싶은 내용이 있다면 알려주세요 툴팁 지워짐
      setTooltipOpen(false);
    }, 4000);
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        bounces={false}
        style={{backgroundColor: colors.grayScale[0]}}>
        {/* '다음 콘텐츠로 보고싶은 내용이 있나요?' 팝업 */}
        <ReviewPopup
          visible={isOpen}
          onOK={onClose}
          onCancel={onClose}
          title={'다음 콘텐츠로 보고싶은 내용이 있나요?'}
          exampleTextList={[
            '햄스터를 키우려면 어떤 걸 준비해야 하나요?',
            '설치류는 포유류인가요?',
          ]}
          placeholder={
            '궁금했던 이야기를 알려주시면 대소동팀이 열심히 알아볼게요!'
          }
        />

        <Box height="375px" bgColor={colors.grayScale[20]} mb="24px" />

        {/* 검색 뷰        */}
        <Box px="18px" mb="24px">
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

        {/* 필터 뷰 */}
        <Box pl="18px">
          <ScrollView
            horizontal
            mb="8px"
            showsHorizontalScrollIndicator={false}>
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

        {/* 다른 컨텐츠 리스트 뷰 */}
        <Box mb="24px" px="18px">
          <FlatList
            nestedScrollEnabled
            data={['', '', '', '', '', '', '', '', '']}
            renderItem={ContentItem}
            keyExtractor={(item, index) => String(index)}
          />
        </Box>
      </KeyboardAwareScrollView>

      {isTooltipOpen && <TooltipImage style={styles.tooltipImage} />}
      <FloatingButtonImage
        onPress={onOpen}
        style={styles.floatingButtonImage}
        fill={colors.fussOrange[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButtonImage: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 52,
    right: 18,
    zIndex: 99,
  },

  tooltipImage: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 78 : 110,
    right: 24,
    zIndex: 99,
  },

  searchIcon: {
    marginLeft: 12,
  },
});

export default ContentsMain;
