import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import {
  DeleteCommentQuery,
  PatchCommentData,
  PostCommentData,
  PostCommentThankData,
} from '~/../types/api/comment';
import QueryKeys from '~/constants/queryKeys';

/**
 *@description 댓글 등록 api 요청
 */
const postComment = async ({postId, content}: PostCommentData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `posts/${postId}/comments`,
    data: {
      content,
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PostCommentData) => postComment(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};

/**
 *@description 댓글 수정 api 요청
 */
const patchComment = async ({postId, commentId, content}: PatchCommentData) => {
  return apiCall<boolean>({
    method: 'PATCH',
    url: `posts/${postId}/comments/${commentId}`,
    data: {
      content,
    },
  });
};

export const usePatchComment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PatchCommentData) => patchComment(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};

/**
 *@description 댓글 삭제 api
 */
const deleteComment = ({postId, commentId}: DeleteCommentQuery) => {
  return apiCall<boolean>({
    method: 'DELETE',
    url: `posts/${postId}/comments/${commentId}`,
  });
};

export const useDeleteComment = (query: DeleteCommentQuery) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return deleteComment(query);
    },
    {
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.comment.getComments]),
    },
  );
};

/**
 *@description 댓글 고마워요 등록/취소 api 요청
 *@param isThank : true 면 등록, false 면 취소
 */
const postCommentThank = async ({
  postId,
  commentId,
  isThank,
}: PostCommentThankData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `posts/${postId}/comments/${commentId}/thanks${
      isThank ? '' : '/cancel'
    }`,
  });
};

export const usePostCommentThank = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PostCommentThankData) => postCommentThank(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.comment.getComments]);
    },
  });
};
