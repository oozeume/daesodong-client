import {FlatList, HStack, Square, Stack, Text, View} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import CallFillIcon from '~/assets/icons/call_fill_14.svg';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import FilterButton from '~/components/contents/main/FilterButton';
import {ScrollView} from 'react-native';
import {APP_WIDTH} from '~/utils/dimension';

type FacilityCategory = '전체' | '분양' | '병원' | '장례';

/**
 *@description 내 계정 - 시설 Tab
 */

function Index() {
  const [selectedCategory, setSelectedCategory] =
    useState<FacilityCategory>('전체');

  return (
    <FlatList
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
              name="분양"
              isActive={selectedCategory === '분양'}
              onPress={() => setSelectedCategory('분양')}
            />
            <FilterButton
              name="병원"
              isActive={selectedCategory === '병원'}
              onPress={() => setSelectedCategory('병원')}
            />
            <FilterButton
              name="장례"
              isActive={selectedCategory === '장례'}
              onPress={() => setSelectedCategory('장례')}
            />
          </HStack>
        </ScrollView>
      )}
      backgroundColor={colors.grayScale[0]}
      renderItem={() => (
        <HStack
          space={'14px'}
          px={'18px'}
          pt={'18px'}
          pb={'20px'}
          backgroundColor={colors.grayScale[0]}
          flex={1}
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale[10]}>
          <Stack flex={1} space={'4px'}>
            <HStack alignItems={'center'} space={'8px'}>
              <Text color={colors.grayScale[80]} fontSize={'16px'}>
                시설명
              </Text>
              <Text color={colors.grayScale[50]} fontSize={'12px'}>
                시설종류
              </Text>
            </HStack>
            <Text fontSize={'13px'} color={colors.grayScale[50]} noOfLines={1}>
              시설 주소가 입력됩니다. 영역 초과시 말줄임 시설 주소가 입력됩니다.
              영역 초과시 말줄임
            </Text>
            <HStack alignItems={'center'}>
              <StarFillIcon fill={colors.fussOrange[0]} />
              <Text
                ml={'4px'}
                lineHeight={'18px'}
                color={colors.fussOrange[0]}
                fontSize={'13px'}
                fontWeight={'500'}>
                4.5
              </Text>
              <View
                ml={'8px'}
                mr={'10px'}
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
              />
              <MessageFillIcon fill={colors.grayScale['50']} />
              <Text
                lineHeight={'18px'}
                ml={'4px'}
                color={colors.grayScale[50]}
                fontSize={'13px'}
                fontWeight={'500'}>
                100
              </Text>
              <View
                ml={'8px'}
                mr={'10px'}
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
              />
              <CallFillIcon />
              <Text
                lineHeight={'18px'}
                ml={'4px'}
                color={colors.grayScale[50]}
                fontSize={'13px'}
                fontWeight={'500'}>
                02-123-4567
              </Text>
            </HStack>
          </Stack>
          <Square
            width={70}
            height={70}
            backgroundColor={colors.grayScale[20]}
          />
        </HStack>
      )}
    />
  );
}

export default Index;
