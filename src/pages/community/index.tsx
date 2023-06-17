import {HStack, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BestContents from '~/components/community/main/BestContents';
import PetType from '~/components/community/main/PetType';
import {colors} from '~/theme/theme';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContents from '../../components/community/main/CommunityContents';
import {useGetCommunityPostList} from '~/api/community/queries';
import {usePostCoummunityPostCount} from '~/api/community/mutation';
import CommunityPost from '~/model/communityPost';
import {Platform, StyleSheet} from 'react-native';
import TooltipImage from '~/assets/images/tooltip_image.svg';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import {APP_HEIGHT} from '~/utils/dimension';
import {TAB_HEIGHT} from '~/constants/style';
import {useTagRegister} from '~/store/useTagContext';
import FloatingButton from '~/components/common/button/FloatingButton';

/**
 *@description 커뮤니티 메인페이지
 */
const CommunityMain = () => {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [petType, setPetType] = useState('전체');
  const [sort, setSort] = useState<'latest' | 'view'>('latest');
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const postCoummunityPostCount = usePostCoummunityPostCount();
  const [isTooltipOpen, setTooltipOpen] = useState(true);

  const [postList, setPostList] = useState<CommunityPost[]>([]);

  const setTags = useTagRegister();

  useEffect(() => {
    setTimeout(() => {
      // 4초 후, 다음 콘텐츠로 보고 싶은 내용이 있다면 알려주세요 툴팁 지워짐
      setTooltipOpen(false);
    }, 4000);

    // 등록, 수정에 따른 태그 폼 초기화
    setTags([]);
  }, []);

  const {
    data: rawPostList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetCommunityPostList({
    limit: 10,
    sort,
    community: petType === '전체' ? undefined : petType,
  });

  /**
   *@description 스크롤이 하단에 도달하면 다음 스크롤 내용 조회 핸들러
   */
  const onExpandList = () => {
    // 다음 페이지 조회 중이 아니고 전체 포스트 카운트보다 현재 포스트 카운트가 적을 때만 패치.
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      totalPostsCount > postList.length
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    // 게시글 리스트 state 설정
    if (rawPostList?.pages) {
      let _postList: CommunityPost[] = [];
      rawPostList?.pages.forEach(item => {
        const tmpList = item.data.map(_item => new CommunityPost(_item));

        _postList = [..._postList, ...tmpList];
      });

      setPostList(_postList);
    }
  }, [rawPostList]);

  useEffect(() => {
    // 전체 게시글 숫자 조회
    const getPostTotalCount = async () => {
      const {data: _totalCount} = await postCoummunityPostCount.mutateAsync();
      setTotalPostsCount(_totalCount);
    };

    getPostTotalCount();
  }, []);

  const pageComponents = [
    <BestContents />,
    // <PetType setPetType={setPetType} petType={petType} />,
    // <MainFilter totalPostsCount={0} setSort={setSort} />,
    <CommunityContents contentsList={postList} />,
  ];
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        height: APP_HEIGHT - TAB_HEIGHT,
        backgroundColor: colors.grayScale[0],
      }}>
      <FlatList
        disableVirtualization={false}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        data={pageComponents}
        stickyHeaderIndices={[2]}
        onEndReached={onExpandList}
        onEndReachedThreshold={1}
        renderItem={({item}) => {
          return (
            <Stack>
              <Stack bgColor={colors.grayScale[10]}>{item}</Stack>
            </Stack>
          );
        }}
      />

      {isTooltipOpen && <TooltipImage style={styles.tooltipImage} />}

      <FloatingButton onPress={() => navigate('CommunityRegister')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButtonImage: {
    position: 'absolute',
    bottom: Math.floor((APP_HEIGHT - TAB_HEIGHT) * 0.05),
    right: 22,
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

export default CommunityMain;
