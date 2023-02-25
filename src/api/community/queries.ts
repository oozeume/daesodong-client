import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import queryString from 'query-string';
import {
  GetCommunityPostListQuery,
  GetCommunityPostResponse,
} from '~/../types/api/community';
import Post from '~/model/post';

/**
 *@description 커뮤니티 게시글 리스트 조회 api
 */
const getCommunityPostList = (query: GetCommunityPostListQuery) => {
  const _query = queryString.stringify(query);

  return apiCall<GetCommunityPostResponse[]>({
    method: 'GET',
    url: `posts?${_query}`,
  });
};

export const useGetCommunityPostList = (query: GetCommunityPostListQuery) => {
  return useInfiniteQuery(
    [QueryKeys.community.getPosts, query],
    param => {
      const initQuery = param.queryKey[1] as GetCommunityPostListQuery;

      return getCommunityPostList(param.pageParam ?? initQuery);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastDataLength = lastPage.data.length;
        return {
          limit: 10,
          sort: 'latest',
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
 *@description 커뮤니티 게시글 조회 api
 */
const getCommunityPost = async (id: string) => {
  return apiCall<GetCommunityPostResponse>({
    method: 'GET',
    url: `posts/${id}`,
  });
};

export const useGetCommunityPost = (id: string, enabled?: boolean) => {
  return useQuery(
    [QueryKeys.community.getPost, id],
    () => {
      return getCommunityPost(id);
    },
    {
      select: data => {
        return new Post(data.data);
      },
      enabled,
    },
  );
};

/**
 *@description 커뮤니티 게시글 삭제 api
 */
const deleteCommunityPost = async (id: string) => {
  return apiCall<GetCommunityPostResponse>({
    method: 'DELETE',
    url: `posts/${id}`,
  });
};

export const useDeleteCommunityPost = (id: string) => {
  return useQuery(
    [QueryKeys.community.deletePost],
    ({queryKey}) => {
      return deleteCommunityPost(id);
    },
    {
      cacheTime: 0,
      enabled: false,
    },
  );
};
