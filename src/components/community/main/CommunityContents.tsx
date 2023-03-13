import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, HStack, Text, View} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import CommunityContent from '~/components/community/detail/Content';
import {colors} from '~/theme/theme';
import {FlatList} from 'react-native-gesture-handler';
import CommunityPost from '~/model/communityPost';

interface Props {
  contentsList?: CommunityPost[];
}

/**
 *@description 커뮤니티 게시글 리스트
 */
function CommunityContents({contentsList}: Props) {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  return (
    <FlatList
      data={contentsList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <CommunityContent
          contentData={item}
          isVisibleTime
          isVisibleBottomUserInfo
          viewMode="list"
          viewAllButton={
            <Box mb={'16px'}>
              <Text
                onPress={() =>
                  navigation.navigate('CommunityDetail', {id: item.id})
                }
                color={colors.grayScale[50]}>
                전체보기
              </Text>
            </Box>
          }
        />
      )}
    />
  );
}

export default CommunityContents;
