import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';
import {
  PatchCommunityPost,
  PostCummunityPostData,
  PostCummunityPostThankData,
} from '~/../types/api/community';

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
  return useMutation((data: PostCummunityPostData) =>
    postCummunityPost(data, id),
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
const postCummunityPostThank = ({id, isThank}: PostCummunityPostThankData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `posts/${id}/thanks${isThank ? '' : '/cancel'}`,
  });
};

export const usePostCummunityPostThank = () => {
  return useMutation((data: PostCummunityPostThankData) =>
    postCummunityPostThank(data),
  );
};
