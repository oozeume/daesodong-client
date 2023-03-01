import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import {
  DeleteCommentQuery,
  GetCommentListQuery,
  GetCommentListResponse,
} from '~/../types/api/comment';
import queryString from 'query-string';

/**
 *@description 댓글 리스트 조회 api
 */
const getCommentList = (postId: string, query: GetCommentListQuery) => {
  const _query = queryString.stringify(query);

  return apiCall<GetCommentListResponse>({
    method: 'GET',
    url: `posts/${postId}/comments?${_query}`,
  });
};

export const useGetCommentList = (
  postId: string,
  query: GetCommentListQuery,
) => {
  return useInfiniteQuery(
    [QueryKeys.comment.getComments, query],
    param => {
      return getCommentList(postId, param.pageParam ?? query);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastDataLength = lastPage.data.length;
        return {
          limit: 10,
          cursor:
            lastDataLength === 0
              ? undefined
              : lastPage.data[lastDataLength - 1].id,
        };
      },
      keepPreviousData: true,
    },
  );
};

/**
 *@description 베스트 댓글 리스트 조회 api
 */
const getBestCommentList = (postId: string) => {
  return apiCall<GetCommentListResponse>({
    method: 'GET',
    url: `posts/${postId}/comments/best`,
  });
};

export const useGetBestCommentList = (postId: string) => {
  return useQuery([QueryKeys.comment.getComments, postId], () => {
    return getBestCommentList(postId);
  });
};
