import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';

interface PostCummunityPostData {
  //
}

interface PostCummunityPostResponse {
  //
}

interface PatchCommunityPost {
  //
}

interface PatchCommunityResponse {
  //
}

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
