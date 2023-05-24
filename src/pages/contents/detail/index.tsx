import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useState, useEffect, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ShareFillIcon from '~/assets/icons/share_fill.svg';
import BookmarkIcon from '~/assets/icons/bookmark_fill.svg';
import {colors} from '~/theme/theme';
import {useRoute} from '@react-navigation/native';
import TagList from '~/components/contents/detail/TagList';
import ContentsReivewView from '~/components/contents/detail/ContentsReivewView';
import {StyleSheet} from 'react-native';
import {RouteHookProp} from '~/../types/navigator';
import {useGetContentDetail} from '~/api/contents/queries';
import Content from '~/model/content';
import {APP_WIDTH} from '~/utils/dimension';
import {
  useBookmarkContents,
  useCancelBookmarkContents,
} from '~/api/contents/mutation';
import {useGetUser} from '~/api/user/queries';
import _ from 'lodash';
import FullImageSwiper from '~/components/common/swiper/FullImageSwiper';

/**
 *@description 컨텐츠 상세
 */
const ContentsDetail = () => {
  const {params} = useRoute<RouteHookProp<'ContentsDetail'>>();
  const {data: userData} = useGetUser();

  // 하단 북마크, 댓글, 공유하기 버튼 뷰 on/off state
  const [isBottomBarVisible, setBottomBarVisible] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState<number>();
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const {data: contentData, refetch} = useGetContentDetail(params.id);

  const [content, setContent] = useState<Content>(new Content());

  const {mutateAsync: cancelBookmark} = useCancelBookmarkContents(content.id);
  const {mutateAsync: bookmark} = useBookmarkContents(content.id);

  const isBookmark = useMemo(() => {
    return content.isBookmark(userData?.id);
  }, [userData]);

  const onBookmark = () => {
    if (isBookmark) {
      cancelBookmark().then(() => refetch());
    } else {
      bookmark().then(() => refetch());
    }
  };

  useEffect(() => {
    if (contentData) {
      setContent(new Content(contentData.data));
    }
  }, [contentData]);

  return (
    <SafeAreaView>
      <ScrollView
        nestedScrollEnabled
        bounces={false}
        style={{backgroundColor: colors.grayScale['0'], minHeight: '100%'}}
        onScrollBeginDrag={event => {
          if (!scrollViewHeight)
            setScrollViewHeight(
              event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height,
            );
        }}
        scrollEventThrottle={50}
        onScroll={event => {
          setScrollHeight(event.nativeEvent.contentOffset.y);
        }}
        onScrollEndDrag={() => setBottomBarVisible(true)}>
        <Image
          src={content.representiveImage}
          alt={content.id}
          mb="53px"
          width={APP_WIDTH}
          height={APP_WIDTH}
        />

        <Box mb="44px" px="20px">
          <Center>
            {/* 태그 리스트 */}
            <TagList list={content.tags} />

            {/* 콘텐츠 제목 */}
            <Text
              mb="12px"
              fontSize={'20px'}
              fontWeight={700}
              color={colors.grayScale['80']}>
              {content.title}
            </Text>

            {/* 콘텐츠 작성일 */}
            <Text
              mb="48px"
              fontSize={'13px'}
              fontWeight={400}
              color={colors.grayScale['60']}>
              {content.createdAt}
            </Text>

            {/* 콘텐츠 본문 */}
            <Box>
              <Text mb="44px" fontSize={'15px'} color={colors.grayScale['70']}>
                {content.description}
              </Text>
            </Box>
          </Center>
        </Box>

        {/* 콘텐츠 이미지 */}
        {!_.isEmpty(content.images) && (
          <FullImageSwiper images={content.images} />
        )}

        <Box mt={'52px'} mb="80px" px="18px">
          <Center>
            {/* 콘텐츠 소제목 */}
            <Text
              w="100%"
              mb="12px"
              fontSize={'18px'}
              fontWeight={700}
              color={colors.grayScale['80']}>
              {content.subTitle}
            </Text>

            {/* 콘텐츠 본문 */}
            <Box>
              <Text mb="44px" fontSize={'15px'} color={colors.grayScale['70']}>
                {content.subDescription}
              </Text>
            </Box>
          </Center>
        </Box>

        {/* 컨텐츠 평가 뷰 */}
        <ContentsReivewView content={content} />

        {/* 다른 컨텐츠 리스트 뷰 */}
        {/* <OtherContentsList /> */}
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
            <Pressable mr="6px" onPress={onBookmark}>
              <HStack>
                <BookmarkIcon
                  width={'24px'}
                  height={'24px'}
                  fill={
                    isBookmark ? colors.fussOrange['0'] : colors.grayScale[30]
                  }
                />
                <Text
                  mr="16px"
                  fontSize={'15px'}
                  color={colors.grayScale['60']}>
                  {content.bookmarksCount}
                </Text>
              </HStack>
            </Pressable>

            <HStack>
              <ShareFillIcon
                fill={colors.grayScale['70']}
                style={styles.shareFillIcon}
              />

              <Text fontSize={'15px'} color={colors.grayScale['70']}>
                공유
              </Text>
            </HStack>
          </HStack>
        </Box>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shareFillIcon: {
    marginRight: 4,
  },

  messageFillIcon: {
    marginRight: 6,
  },
});

export default ContentsDetail;
