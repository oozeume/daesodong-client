import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import queryString from 'query-string';
import {GetCommunityPostResponse} from '~/../types/api/community';

/**
 *@description 답글 리스트 조회 api
 */
const getRecommentList = (commentId: string) => {
  return apiCall<GetCommunityPostResponse[]>({
    method: 'GET',
    url: `comments/${commentId}`,
  });
};

export const useGetRecommentList = (commentId: string) => {
  return useQuery([QueryKeys.recomment.getRecomments], () => {
    return getRecommentList(commentId);
  });
};

interface DeleteRecommentQuery {
  commentId: number;
  recommentId: number;
}

/**
 *@description 답글 삭제 api
 */
const deleteComment = ({commentId, recommentId}: DeleteRecommentQuery) => {
  return apiCall<boolean>({
    method: 'DELETE',
    url: `comments/${commentId}/comments${recommentId}`,
  });
};

export const useDeleteComment = (query: DeleteRecommentQuery) => {
  return useQuery([QueryKeys.comment.deleteComment], () => {
    return deleteComment(query);
  });
};
