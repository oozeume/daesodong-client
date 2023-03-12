import {Box, KeyboardAvoidingView, Stack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import CommunityContent from '~/components/community/detail/Content';
import {useRoute} from '@react-navigation/native';
import {RouteHookProp} from '~/../types/navigator';
import Popup from '~/components/common/popup/Popup';
import {useGetCommunityPost} from '~/api/community/queries';
import {useGetBestCommentList, useGetCommentList} from '~/api/comment/queries';
import useSetDetailHeader from '~/components/community/detail/useSetDetailHeader';
import CommentInput from '~/components/community/detail/CommentInput';
import {CommentInputType} from '~/../types/community';
import CommentList from '~/components/community/detail/CommentList';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import CommentModel from '~/model/comment';
import Comment from '~/model/comment';
import {Platform} from 'react-native';
import _ from 'lodash';
import {
  useDeleteCommunityPost,
  usePostCummunityPostThank,
} from '~/api/community/mutation';
import {useDeleteComment} from '~/api/comment/mutation';
import {useDeleteRecomment} from '~/api/recomment/mutation';
import {ErrorResponseTransform} from '~/../types/api/common';
import useToastShow from '~/hooks/useToast';
import {useGetUser} from '~/api/user/queries';

/**
 *@description 커뮤니티 상세 + 댓글 페이지
 */
const CommunityDetail = () => {
  const {params} = useRoute<RouteHookProp<'CommunityDetail'>>();
  const {toastShow} = useToastShow();
  const postId = params.id;

  const COMMENT_INPUT_VIEW_HEIGHT = 60;

  // 키캡이나 답글달기로 선택된 댓글 state
  const [selectedComment, setSelectedComment] = useState<CommentModel>();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [bestCommentList, setBestCommentList] = useState<Comment[]>([]);

  // 답글 등록 여부 state
  const [commentInputType, setCommentInputType] =
    useState<CommentInputType>('POST_COMMENT');

  const [selectedRecomment, setSelectedRecomment] = useState<CommentModel>();

  const {data: userData} = useGetUser();
  const getCommunityPost = useGetCommunityPost(postId, {
    enabled: true,
    onError: (error: ErrorResponseTransform) => {
      if (error.statusCode === 404) {
        toastShow('게시글이 존재하지 않습니다.');
        navigation.goBack();
      }
    },
  });

  // 컨텐츠 고마워요 여부 state
  const [isContentThank, setContnetThank] = useState(
    getCommunityPost?.data?.isThank,
  );
  const [thankContentCount, setThankContentCount] = useState(
    getCommunityPost?.data?.thanks ?? 0,
  );

  const {navigation, isOpenDeletePopup, setOpenDeletePopup} =
    useSetDetailHeader({
      postId,
      isBookmarkServerState: getCommunityPost.data?.isBookmark,
      writerId: getCommunityPost.data?.userId,
      userId: userData?.data.id,
    });

  const getCommentList = useGetCommentList(postId, {
    limit: 10,
  });

  const getBestCommentList = useGetBestCommentList(postId);
  const postCummunityPostThank = usePostCummunityPostThank();

  const deleteComment = useDeleteComment({
    postId,
    commentId: selectedComment?.id ?? '',
  });

  const deleteCommunityPost = useDeleteCommunityPost(postId);

  const deleteRecomment = useDeleteRecomment({
    commentId: selectedComment?.id ?? '',
    recommentId: selectedRecomment?.id ?? '',
  });

  /**
   *@description 게시글 삭제
   */
  const onDeletePost = () => {
    deleteCommunityPost
      .mutateAsync()
      .then(response => {
        if (response.data) {
          navigation.reset({
            index: 0,
            routes: [{name: 'tab', state: {routes: [{name: 'Commuity'}]}}],
          });
        }
      })
      .catch(error => console.log(error));
  };

  /**
   *@description 댓글 삭제
   */
  const onDeleteComment = () => {
    deleteComment
      .mutateAsync()
      .then(response => {
        if (response.data) getCommentList.refetch();
      })
      .catch(error => console.log(error));
  };

  /**
   *@description 답글 삭제
   */
  const onDeleteRecomment = () => {
    deleteRecomment
      .mutateAsync()
      .then(response => {
        if (response.data) getCommentList.refetch();
      })
      .catch(error => console.log(error));
  };

  /**
   *@description 스크롤이 하단에 도달하면 다음 스크롤 내용 조회 핸들러
   */
  const onExpandList = () => {
    // 다음 페이지 조회 중이 아니고 전체 포스트 카운트보다 현재 포스트 카운트가 적을 때만 패치.
    if (
      getCommunityPost.data &&
      getCommentList.hasNextPage &&
      !getCommentList.isFetchingNextPage &&
      getCommunityPost.data.commentsCount > commentList.length
    ) {
      getCommentList.fetchNextPage();
    }
  };

  const onContentThank = () => {
    if (!getCommunityPost.data) return;

    setContnetThank(!isContentThank);

    setThankContentCount(prev => {
      if (isContentThank && prev === 0) return 0;

      return isContentThank ? prev - 1 : prev + 1;
    });

    postCummunityPostThank.mutateAsync({
      id: postId,
      isOn: !getCommunityPost.data?.isThank,
    });
  };

  useEffect(() => {
    if (getBestCommentList.data) {
      let _commentList = getBestCommentList.data.data.map(
        item => new Comment(item),
      );

      setBestCommentList(_commentList);
    }
  }, [getBestCommentList.data]);

  useEffect(() => {
    // 댓글 리스트 state 설정
    if (getCommentList.data?.pages) {
      let _commentList: Comment[] = [];
      getCommentList.data?.pages.forEach(item => {
        const tmpList = item.data.map(_item => new Comment(_item));

        _commentList = [..._commentList, ...tmpList];
      });

      setCommentList(_commentList);
    }
  }, [getCommentList.data]);

  const pageComponents = [
    <CommunityContent
      isVisibleTopUserInfo
      isVisibleLike
      isVisibleTag
      contentData={getCommunityPost.data}
      onThank={onContentThank}
      isThank={isContentThank}
      thankCount={thankContentCount}
    />,

    <Box height="8px" bgColor={colors.grayScale['10']}></Box>,

    <CommentList
      setSelectedComment={setSelectedComment}
      setSelectedRecomment={setSelectedRecomment}
      commentList={bestCommentList ?? []}
      setOpenDeletePopup={setOpenDeletePopup}
      setCommentInputType={setCommentInputType}
    />,

    <CommentList
      setSelectedComment={setSelectedComment}
      setSelectedRecomment={setSelectedRecomment}
      commentList={commentList ?? []}
      setOpenDeletePopup={setOpenDeletePopup}
      setCommentInputType={setCommentInputType}
    />,
  ];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        keyboardVerticalOffset={COMMENT_INPUT_VIEW_HEIGHT}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <Box flex={1}>
          <KeyboardAwareFlatList
            // disableVirtualization={false}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            data={pageComponents}
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
        </Box>

        <Box flex={0}>
          <CommentInput
            postId={postId}
            selectedComment={selectedComment}
            selectedRecomment={selectedRecomment}
            commentInputType={commentInputType}
            setCommentInputType={setCommentInputType}
            onEnrollCallback={() => getCommentList.refetch()}
          />
        </Box>
      </KeyboardAvoidingView>

      <Popup
        title={'게시글을 삭제할까요?'}
        subText="삭제한 게시글의 내용은 복구할 수 없어요"
        isVisible={isOpenDeletePopup.post}
        setIsVisible={(isVisible: boolean) =>
          setOpenDeletePopup(prev => ({...prev, post: isVisible}))
        }
        onSuccess={onDeletePost}
      />

      <Popup
        title={'댓글을 삭제할까요?'}
        subText={`삭제된 댓글의 내용은 복구할 수 없어요.\n댓글을 삭제해도 내 댓글의 답글들은 삭제되지 않아요.`}
        isVisible={isOpenDeletePopup.comment}
        setIsVisible={(isVisible: boolean) =>
          setOpenDeletePopup(prev => ({...prev, comment: isVisible}))
        }
        onSuccess={onDeleteComment}
      />

      <Popup
        title={'답글을 삭제할까요?'}
        subText={`삭제된 답글의 내용은 복구할 수 없어요.\n답글을 삭제해도 나를 태그한 답글들은 삭제되지 않아요.`}
        isVisible={isOpenDeletePopup.recomment}
        setIsVisible={(isVisible: boolean) =>
          setOpenDeletePopup(prev => ({...prev, recomment: isVisible}))
        }
        onSuccess={onDeleteRecomment}
      />
    </SafeAreaView>
  );
};

export default CommunityDetail;
