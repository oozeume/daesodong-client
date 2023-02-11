import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import queryString from 'query-string';

interface GetCommunityPostListQuery {
  limit: number;
  coummunity?: string;
  // latest or view
  sort: string;
  cursor?: string;
}

export type GetCommunityPostResponse = {
  content?: string | null;
  created_at: string;
  delete_at: string;
  id: string;
  kind: {id: string; name: string};
  kindId: string;
  post_picture: {
    postId: string;
    picture_url?: string | null;
  }[];
  post_tag_join: {
    post_tag: {
      id: string;
      name?: string | null;
    };
  }[];
  thanks: number;
  title?: string | null;
  updated_at: string;
  userId: string;
  views: 0;
};

/**
 *@description 커뮤니티 게시글 리스트 조회 api
 */
const getCommunityPostList = async (query: GetCommunityPostListQuery) => {
  const _query = queryString.stringify(query);

  return apiCall<GetCommunityPostResponse[]>({
    method: 'GET',
    url: `posts?${_query}`,
  });
};

export const useGetCommunityPostList = (query: GetCommunityPostListQuery) => {
  return useQuery(
    [QueryKeys.community.getPosts, query],
    ({queryKey}) => {
      const _query = queryKey[1] as GetCommunityPostListQuery;
      return getCommunityPostList(_query);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // enabled: !_.isUndefined(mobile),
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

export const useGetCommunityPost = (id: string) => {
  return useQuery(
    [QueryKeys.community.getPost],
    () => {
      return getCommunityPost(id);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // enabled: !_.isUndefined(mobile),
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
    [QueryKeys.auth.getAuthMobile],
    ({queryKey}) => {
      return deleteCommunityPost(id);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // enabled: !_.isUndefined(mobile),
    },
  );
};
