import {HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContent from '~/components/community/detail/Content';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import ListFilterHeader from '~/components/common/ListFilterHeader';
import ContentsCategoryHeader from '~/components/common/ContentsCategoryHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 *@description 내 계정 - 내가 작성한 게시글
 */

function MyCommunityContent() {
  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <>
            <ContentsCategoryHeader />
            <ListFilterHeader />
          </>
        }
        data={['', '']}
        renderItem={({item}) => (
          <CommunityContent
            isVisibleTime
            userInfo={
              <HStack>
                <AvatarIcon
                  width={20}
                  height={20}
                  fill={colors.grayScale['30']}
                />

                <HStack alignItems={'center'} space="4px" marginLeft={'8px'}>
                  <Text color={colors.grayScale['80']} fontSize={'14px'}>
                    닉네임
                  </Text>
                  <View
                    backgroundColor={colors.grayScale['30']}
                    h="8px"
                    w="1px"
                  />
                  <Text color={colors.grayScale['60']} fontSize={'13px'}>
                    골든햄스터
                  </Text>
                  <View
                    backgroundColor={colors.grayScale['30']}
                    h="8px"
                    w="1px"
                  />
                  <Text color={colors.grayScale['60']} fontSize={'13px'}>
                    남아
                  </Text>
                  <View
                    backgroundColor={colors.grayScale['30']}
                    h="8px"
                    w="1px"
                  />
                  <Text color={colors.grayScale['60']} fontSize={'13px'}>
                    2개월
                  </Text>
                </HStack>
              </HStack>
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

export default MyCommunityContent;
