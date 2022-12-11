import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, HStack, Text, View} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import CommunityContent from '~/components/community/detail/Content';
import {colors} from '~/theme/theme';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {FlatList} from 'react-native-gesture-handler';

function CommunityContents() {
  const navigation = useNavigation<NavigationProp<RouteList>>();
  return (
    <FlatList
      data={['', '', '']}
      keyExtractor={(item, index) => index.toString()}
      renderItem={item => (
        <CommunityContent
          viewAllButton={
            <Box mb={'16px'}>
              <Text
                onPress={() => navigation.navigate('CommunityDetail')}
                color={colors.grayScale[50]}>
                전체보기
              </Text>
            </Box>
          }
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
  );
}

export default CommunityContents;
