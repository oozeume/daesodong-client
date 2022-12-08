import {Box, HStack, Pressable, ScrollView, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icons/back.svg';
import DownIcon from '~/assets/icons/down.svg';

import {colors} from '~/theme/theme';
import Header from '~/components/hospital/review/register/Header';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import ContentItem from '~/components/contents/detail/ContentItem';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {FlatList} from 'react-native-gesture-handler';

/**
 *@description 이 시리즈의 다른 이야기 페이지
 */
const OtherContents = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [filter, setFilter] = useState<'최신순' | '조회순' | '정렬 방법'>(
    '정렬 방법',
  );

  return (
    <SafeAreaView>
      <ScrollView
        nestedScrollEnabled
        bounces={false}
        bgColor={colors.grayScale['0']}
        minHeight={'100%'}>
        <Header
          title={'시리즈 이름'}
          leftButton={
            <Pressable
              position="absolute"
              left="18px"
              zIndex={1}
              onPress={() => navigation.goBack()}>
              <BackIcon />
            </Pressable>
          }
        />

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherContents;
