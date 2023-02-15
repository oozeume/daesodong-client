import {Box, KeyboardAvoidingView, ScrollView} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import CommunityContent from '~/components/community/detail/Content';
import {Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteHookProp} from '~/../types/navigator';
import Popup from '~/components/common/popup/Popup';
import {useGetCommunityPost} from '~/api/community/queries';
import {useDeleteComment, useGetCommentList} from '~/api/comment/queries';
import {useDeleteRecomment} from '~/api/recomment/queries';
import useSetDetailHeader from '~/components/community/detail/useSetDetailHeader';
import CommentInput from '~/components/community/detail/CommentInput';
import {CommentInputType, CommentItem} from '~/../types/community';
import CommentList from '~/components/community/detail/CommentList';

/**
 *@description 커뮤니티 상세 + 댓글 페이지
 *@todo 고마워요, 북마크 기능 미구현 (서버 api 나온 후, 구현하기)
 */
const CommunityDetail = () => {
  const {params} = useRoute<RouteHookProp<'CommunityDetail'>>();
  const postId = params.id;

  // 키캡이나 답글달기로 선택된 댓글 state
  const [selectedComment, setSelectedComment] = useState<CommentItem>();

  // 답글 등록 여부 state
  const [commentInputType, setCommentInputType] =
    useState<CommentInputType>('POST_COMMENT');

  const [selectedRecomment, setSelectedRecomment] = useState<CommentItem>();

  // 삭제 여부 팝업 오픈 state
  const [isOpenDeletePopup, setOpenDeletePopup] = useState({
    post: false,
    comment: false,
    recomment: false,
  });

  const getCommunityPost = useGetCommunityPost(postId);

  const {data: commentList, refetch} = useGetCommentList(postId);
  const deleteComment = useDeleteComment({
    postId,
    commentId: selectedComment?.id ?? '',
  });

  const deleteRecomment = useDeleteRecomment({
    commentId: selectedComment?.id ?? '',
    recommentId: selectedRecomment?.id ?? '',
  });

  /**
   *@todo 북마크 기능 미구현, 서버 api 나온 후 구현.
   */
  const {navigation, isBookmark, setBookmark} = useSetDetailHeader();

  /**
   *@description 댓글 삭제
   */
  const onDeleteComment = () => {
    deleteComment
      .refetch()
      .then(response => {
        if (response.data) refetch();
      })
      .catch(error => console.log(error));
  };

  /**
   *@description 답글 삭제
   */
  const onDeleteRecomment = () => {
    deleteRecomment
      .refetch()
      .then(response => {
        if (response.data) refetch();
      })
      .catch(error => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <SafeAreaView>
        <ScrollView
          bgColor={colors.grayScale['0']}
          minHeight="100%"
          bounces={false}>
          {/* 컨텐츠 */}
          <CommunityContent
            isVisibleUserInfo
            isVisibleLike
            isVisibleTag
            contentData={getCommunityPost.data?.data}
          />

          <Box height="8px" bgColor={colors.grayScale['10']}></Box>

          {/* 댓글 리스트 */}
          <CommentList
            setSelectedComment={setSelectedComment}
            selectedComment={selectedComment}
            setSelectedRecomment={setSelectedRecomment}
            commentList={commentList?.data ?? []}
            setOpenDeletePopup={setOpenDeletePopup}
            setCommentInputType={setCommentInputType}
            commentInputType={commentInputType}
          />

          {/* 댓글 입력 */}
          <CommentInput
            postId={postId}
            selectedComment={selectedComment}
            commentInputType={commentInputType}
            setCommentInputType={setCommentInputType}
            onEnrollCallback={() => refetch()}
          />

          <Popup
            title={'게시글을 삭제할까요?'}
            subText="삭제한 게시글의 내용은 복구할 수 없어요"
            isVisible={isOpenDeletePopup.post}
            setIsVisible={(isVisible: boolean) =>
              setOpenDeletePopup(prev => ({...prev, post: isVisible}))
            }
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommunityDetail;
