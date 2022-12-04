import {
  Box,
  Center,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icons/back.svg';
import ShareFillIcon from '~/assets/icons/share_fill.svg';
import BookmarkIcon from '~/assets/icons/bookmark_fill.svg';
import MessageFillIcon from '~/assets/icons/message_fill.svg';

import {colors} from '~/theme/theme';
import Header from '~/components/hospital/review/register/Header';
import {Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import TagList from '~/components/contents/detail/TagList';
import OtherContentsList from '~/components/contents/detail/OtherContentsList';
import ContentsReivewView from '~/components/contents/detail/ContentsReivewView';

/**
 *@description 컨텐츠 상세
 */
const ContentsDetail = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const dummyText = `무성할 하나에 비둘기, 없이 멀리 라이너 별에도 계십니다. 불러 이름과, 이국 토끼, 묻힌 프랑시스 까닭입니다. 한 새워 노루, 나는 애기 쉬이 많은 버리었습니다. 가난한 차 밤이 어머님, 흙으로 피어나듯이 이름을 봅니다. 어머님, 노새, 어머님, 써 걱정도 패, 멀리 별 있습니다.`;

  const [isBottomBarVisible, setBottomBarVisible] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState<number>();
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const scrollViewRef = useRef();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <SafeAreaView>
        <ScrollView
          ref={scrollViewRef}
          bgColor={colors.grayScale['0']}
          minHeight={'100%'}
          onScrollBeginDrag={event => {
            if (!scrollViewHeight)
              setScrollViewHeight(event.nativeEvent.layoutMeasurement.height);
          }}
          onScroll={event => {
            setScrollHeight(event.nativeEvent.contentOffset.y);
          }}
          onScrollEndDrag={() => setBottomBarVisible(true)}>
          <Header
            title={``}
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

          {/* 콘텐츠 이미지 */}
          <Box mb="53px" height={'375px'} bgColor={colors.grayScale['10']} />

          <Box mb="44px" px="20px">
            <Center>
              {/* 태그 리스트 */}
              <TagList list={['텍스트', '텍스트', '텍스트']} />

              {/* 콘텐츠 제목 */}
              <Text
                mb="12px"
                fontSize={'20px'}
                fontWeight={700}
                color={colors.grayScale['80']}>
                콘텐츠 제목 텍스트가 노출됩니다
              </Text>

              {/* 콘텐츠 작성일 */}
              <Text
                mb="48px"
                fontSize={'13px'}
                fontWeight={400}
                color={colors.grayScale['60']}>
                YYYY.MM.DD
              </Text>

              {/* 콘텐츠 본문 */}
              <Box>
                <Text
                  mb="44px"
                  fontSize={'15px'}
                  color={colors.grayScale['70']}>
                  {dummyText}
                </Text>
              </Box>
            </Center>
          </Box>

          {/* 콘텐츠 이미지 */}
          <Box mb="53px" height={'240px'} bgColor={colors.grayScale['10']} />

          <Box mb="80px" px="18px">
            <Center>
              {/* 콘텐츠 소제목 */}
              <Text
                w="100%"
                mb="12px"
                fontSize={'18px'}
                fontWeight={700}
                color={colors.grayScale['80']}>
                콘텐츠 제목 텍스트가 노출됩니다
              </Text>

              {/* 콘텐츠 본문 */}
              <Box>
                <Text
                  mb="44px"
                  fontSize={'15px'}
                  color={colors.grayScale['70']}>
                  {dummyText}
                </Text>
              </Box>
            </Center>
          </Box>

          {/* 컨텐츠 평가 뷰 */}
          <ContentsReivewView />

          {/* 다른 컨텐츠 리스트 뷰 */}
          <OtherContentsList />
        </ScrollView>

        {/* 하단 북마크, 댓글, 공유하기 버튼 뷰 */}
        {isBottomBarVisible && (
          <Box
            w="100%"
            position={'absolute'}
            bottom="0px"
            bgColor={colors.grayScale['0']}
            h="86px"
            zIndex={99}
            pl="21"
            pr="18px"
            pt="19px">
            <View
              position={'absolute'}
              top={0}
              zIndex={1}
              w={
                scrollViewHeight
                  ? `${(scrollHeight / scrollViewHeight) * 110}%`
                  : 0
              }
              h="2px"
              bgColor={colors.fussOrange['0']}
            />

            <HStack justifyContent={'space-between'}>
              <HStack>
                <BookmarkIcon
                  width={'24px'}
                  height={'24px'}
                  fill={colors.fussOrange['0']}
                  style={{marginRight: 6}}
                />
                <Text
                  mr="16px"
                  fontSize={'15px'}
                  color={colors.grayScale['60']}>
                  100
                </Text>

                <MessageFillIcon
                  width={'24px'}
                  height={'24px'}
                  fill={colors.grayScale['40']}
                  style={{marginRight: 6}}
                />
                <Text fontSize={'15px'} color={colors.grayScale['60']}>
                  100
                </Text>
              </HStack>

              <HStack>
                <ShareFillIcon
                  fill={colors.grayScale['70']}
                  style={{marginRight: 10}}
                />

                <Text fontSize={'15px'} color={colors.grayScale['70']}>
                  친구에게 공유
                </Text>
              </HStack>
            </HStack>
          </Box>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ContentsDetail;
