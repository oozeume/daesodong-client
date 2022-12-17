import {HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import Notice from '~/assets/icons/notice_30.svg';
import {APP_WIDTH} from '~/utils/dimension';
import NoticeDashboard from '~/components/mypage/NoticeDashboard';
import BookMarkFillIcon from '~/assets/icons/bookmark_fill_30.svg';
import HeartFillIcon from '~/assets/icons/heart_fill_30.svg';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {ScrollView} from 'react-native-gesture-handler';
import Tag from '~/components/common/Tag';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';

/**
 *@description 내 계정 - 메인
 */

function MyPage() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* 대시보드 */}
      <Stack
        height={'416px'}
        pb={'28px'}
        px={'18px'}
        justifyContent={'flex-end'}
        backgroundColor={colors.fussOrange[0]}>
        <Stack alignItems={'center'}>
          <AvatarIcon width={120} height={120} fill={colors.grayScale['30']} />
          <Text
            mt={'16px'}
            color={colors.grayScale[90]}
            fontWeight={'700'}
            fontSize={'20px'}
            noOfLines={1}>
            봉삼이
          </Text>

          <HStack alignItems={'center'} space="4px" ml={'8px'} mt={'2px'}>
            <Text color={colors.grayScale[90]} fontSize={'14px'}>
              닉네임
            </Text>
            <View backgroundColor={colors.grayScale['80']} h="8px" w="1px" />
            <Text color={colors.grayScale[90]} fontSize={'13px'}>
              골든햄스터
            </Text>
            <View backgroundColor={colors.grayScale['80']} h="8px" w="1px" />
            <Text color={colors.grayScale[90]} fontSize={'13px'}>
              남아
            </Text>
            <View backgroundColor={colors.grayScale['80']} h="8px" w="1px" />
            <Text color={colors.grayScale[90]} fontSize={'13px'}>
              2개월
            </Text>
          </HStack>

          <HStack
            w={APP_WIDTH}
            space={'8px'}
            justifyContent={'center'}
            mt={'24px'}>
            <NoticeDashboard
              name={'새 알림'}
              count={10}
              icon={<Notice fill={colors.fussOrange[0]} />}
              onPress={() => navigation.navigate('MyPageNotice')}
            />
            <NoticeDashboard
              name={'저장'}
              count={1000}
              icon={<BookMarkFillIcon fill={colors.fussOrange[0]} />}
              onPress={() => navigation.navigate('MyPageSave')}
            />
            <NoticeDashboard
              name={'고마워요'}
              count={1000}
              icon={<HeartFillIcon fill={colors.fussOrange[0]} />}
            />
          </HStack>
        </Stack>
      </Stack>

      {/* 내 정보 관리 */}
      <Stack
        px={'18px'}
        pt={'16px'}
        pb={'20px'}
        backgroundColor={colors.grayScale[0]}>
        <Text fontSize={'13px'} py={'14px'} color={colors.grayScale[40]}>
          내 정보 관리
        </Text>
        <HStack
          py={'14px'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Text fontSize={'16px'}>회원등급</Text>
          <Tag
            name={'등급명'}
            bgColor={colors.fussYellow[10]}
            color={colors.grayScale[80]}
          />
        </HStack>
        <Text fontSize={'16px'} py={'14px'}>
          내 정보
        </Text>
        <Text fontSize={'16px'} py={'14px'}>
          아이 정보
        </Text>
        <HStack py={'14px'} space={'10px'}>
          <Text fontSize={'16px'}>내가 작성한 리뷰</Text>
          <Text fontSize={'16px'} color={colors.fussOrange[0]}>
            100
          </Text>
        </HStack>
        <HStack py={'14px'} space={'10px'}>
          <Text fontSize={'16px'}>내가 작성한 게시글</Text>
          <Text fontSize={'16px'} color={colors.fussOrange[0]}>
            100
          </Text>
        </HStack>

        {/* 서비스 문의 */}
        <Text
          fontSize={'13px'}
          py={'14px'}
          color={colors.grayScale[40]}
          mt={'28px'}>
          서비스 문의
        </Text>
        <Text fontSize={'16px'} py={'14px'}>
          1:1 문의
        </Text>
        <HStack
          py={'14px'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Text fontSize={'16px'}>시설 소개/추천하기</Text>
          <Tag
            name={'도움이 필요해요!'}
            width={'91px'}
            bgColor={colors.positive['-40']}
            color={colors.positive[0]}
          />
        </HStack>
        <Text fontSize={'16px'} py={'14px'}>
          서비스 이용약관
        </Text>
        <Text fontSize={'16px'} py={'14px'}>
          개인정보 처리방침
        </Text>
      </Stack>
    </ScrollView>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayScale[0],
  },
});
