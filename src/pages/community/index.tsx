import {HStack, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BestContents from '~/components/community/main/BestContents';
import PetType from '~/components/community/main/PetType';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContents from '../../components/community/main/CommunityContents';
import {useGetCommunityPostList} from '~/api/community/queries';
import {usePostCoummunityPostCount} from '~/api/community/mutation';
import Post from '~/model/post';

/**
 *@description 커뮤니티 메인페이지
 */
const CommunityMain = () => {
  const [petType, setPetType] = useState('전체');
  const [sort, setSort] = useState<'latest' | 'view'>('latest');
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const postCoummunityPostCount = usePostCoummunityPostCount();

  const [postList, setPostList] = useState<Post[]>([]);

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
      let _postList: Post[] = [];
      rawPostList?.pages.forEach(item => {
        const tmpList = item.data.map(_item => new Post(_item));

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

  const data = [
    <BestContents />,
    <PetType setPetType={setPetType} petType={petType} />,
    <HStack
      zIndex={1}
      mb={'8px'}
      height={'50px'}
      bgColor={colors.grayScale[0]}
      px={'18px'}
      py={'16px'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Text color={colors.grayScale[70]}>
        총{' '}
        <Text color={colors.grayScale[70]} fontWeight={'700'}>
          {totalPostsCount}
        </Text>
        개의 이야기
      </Text>

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
        handleFirstButton={() => setSort('latest')}
        handleSecondButton={() => setSort('view')}
      />
    </HStack>,
    <CommunityContents contentsList={postList} />,
  ];
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <FlatList
        disableVirtualization={false}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        stickyHeaderIndices={[2]}
        onEndReached={onExpandList}
        onEndReachedThreshold={1}
        renderItem={({item}) => {
          return (
            <Stack position={'relative'}>
              <Stack bgColor={colors.grayScale[10]}>{item}</Stack>
            </Stack>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CommunityMain;
