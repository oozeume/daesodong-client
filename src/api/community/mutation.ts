import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import {
  GetCommunityPostResponse,
  PatchCommunityPost,
  PostCummunityPostBookmarkData,
  PostCummunityPostData,
  PostCummunityPostThankData,
} from '~/../types/api/community';
import QueryKeys from '~/constants/queryKeys';

/**
 *@description 커뮤니티 게시글 등록 / 수정
 */
const postCummunityPost = (data: PostCummunityPostData, id?: string) => {
  return apiCall<boolean>({
    method: id ? 'PATCH' : 'POST',
    url: `posts${id ? `/${id}` : ''}`,
    data,
  });
};

export const usePostCummunityPost = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: PostCummunityPostData) => postCummunityPost(data, id),
    {
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.community.getPosts]),
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
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return deleteCommunityPost(id);
    },
    {
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.community.getPosts]),
    },
  );
};

/**
 *@description 커뮤니티 게시글 총 숫자 조회
 */
const postCoummunityPostCount = () => {
  return apiCall<number>({
    method: 'POST',
    url: `posts/conut`,
  });
};

export const usePostCoummunityPostCount = () => {
  return useMutation(() => postCoummunityPostCount());
};

/**
 *@description 커뮤니티 게시글 고마워요 등록/취소
 */
const postCummunityPostThank = ({id, isOn}: PostCummunityPostThankData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `posts/${id}/thanks${isOn ? '' : '/cancel'}`,
  });
};

export const usePostCummunityPostThank = () => {
  return useMutation((data: PostCummunityPostThankData) =>
    postCummunityPostThank(data),
  );
};

/**
 *@description 커뮤니티 게시글 북마크 등록/취소
 *@param isOn - true면 북마크 on, false 면 북마크 off
 */
const postCummunityPostBookmark = ({
  id,
  isOn,
}: PostCummunityPostBookmarkData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `posts/${id}/bookmarks${isOn ? '' : '/cancel'}`,
  });
};

export const usePostCummunityPostBookmark = () => {
  return useMutation((data: PostCummunityPostBookmarkData) =>
    postCummunityPostBookmark(data),
  );
};
