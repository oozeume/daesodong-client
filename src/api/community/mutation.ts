import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';
import {
  PatchCommunityPost,
  PatchCommunityResponse,
  PostCummunityPostData,
  PostCummunityPostResponse,
} from '~/../types/api/community';

/**
 *@description 커뮤니티 게시글 등록
 */
const postCummunityPost = (data: PostCummunityPostData) => {
  return apiCall<PostCummunityPostResponse>({
    method: 'POST',
    url: `posts`,
    data,
  });
};

export const usePostAuthNicknameCheck = () => {
  return useMutation((data: PostCummunityPostData) => postCummunityPost(data));
};

/**
 *@description 커뮤니티 게시글 수정
 */
const patchCummunityPost = (data: PatchCommunityPost) => {
  return apiCall<PatchCommunityResponse>({
    method: 'PATCH',
    url: `posts`,
    data,
  });
};

export const usePatchCommunityPost = () => {
  return useMutation((data: PatchCommunityPost) => patchCummunityPost(data));
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
