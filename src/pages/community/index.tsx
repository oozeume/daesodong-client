import {Box, HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BestContents from '~/components/community/main/BestContents';
import PetType from '~/components/community/main/PetType';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import CommunityContent from '~/components/community/detail/Content';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';
import KekabMenu from '~/components/common/kekab/KekabMenu';

/**
 *@description 커뮤니티 메인페이지
 */

const Community = () => {
  const navigation = useNavigation<NavigationProp<RouteList>>();
  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[1]}>
        <Stack>
          <Stack bgColor={colors.grayScale[0]}>
            <BestContents />
            <PetType />
          </Stack>
        </Stack>

        <HStack
          zIndex={1}
          mb={'8px'}
          height={'50px'}
          bgColor={colors.grayScale[0]}
          px={'18px'}
          py={'16px'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text>총100개의 이야기</Text>

          <KekabMenu
            pressableIcon={
              <HStack space={'2px'} alignItems={'center'}>
                <Text>최신순</Text>
                <DownIcon />
              </HStack>
            }
            left={'-18px'}
            top={'16px'}
            firstButtonName={'최신순'}
            secondButtonName={'인기순'}
            handleFirstButton={() => {}}
            handleSecondButton={() => {}}
          />
        </HStack>

        <Stack position={'relative'}>
          <Stack bgColor={colors.grayScale[10]}>
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
                <HStack
                  borderBottomWidth={1}
                  borderBottomColor={colors.grayScale['10']}>
                  <HStack space={'8px'}>
                    <AvatarIcon
                      width={20}
                      height={20}
                      fill={colors.grayScale['30']}
                      style={{marginRight: 12}}
                    />

                    <Stack>
                      <HStack alignItems={'center'} space="4px">
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
                    </Stack>
                  </HStack>
                </HStack>
              }
            />
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
                <HStack
                  borderBottomWidth={1}
                  borderBottomColor={colors.grayScale['10']}>
                  <HStack space={'8px'}>
                    <AvatarIcon
                      width={20}
                      height={20}
                      fill={colors.grayScale['30']}
                      style={{marginRight: 12}}
                    />

                    <Stack>
                      <HStack alignItems={'center'} space="4px">
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
                    </Stack>
                  </HStack>
                </HStack>
              }
            />
          </Stack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;
