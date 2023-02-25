import {useQuery, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import {
  DeleteCommentQuery,
  GetCommentListResponse,
} from '~/../types/api/comment';
import Comment from '~/model/comment';

/**
 *@description 댓글 리스트 조회 api
 */
const getCommentList = (postId: string) => {
  return apiCall<GetCommentListResponse[]>({
    method: 'GET',
    url: `posts/${postId}/comments`,
  });
};

export const useGetCommentList = (postId: string) => {
  return useQuery(
    [QueryKeys.comment.getComments],
    () => {
      return getCommentList(postId);
    },
    {
      select: data => {
        return (data?.data ?? []).map(item => new Comment(item));
      },
    },
  );
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

  return useQuery(
    [QueryKeys.comment.deleteComment],
    () => {
      return deleteComment(query);
    },
    {
      enabled: false,
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.comment.getComments]),
    },
  );
};
