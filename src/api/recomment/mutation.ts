import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import {
  PatchRecommentData,
  PostRecommentData,
  PostRecommentThankData,
} from '~/../types/api/recomment';

/**
 *@description 답글 등록 api 요청
 */
const postRecomment = async ({commentId, content}: PostRecommentData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `comments/${commentId}`,
    data: {
      content,
    },
  });
};

export const usePostRecomment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PostRecommentData) => postRecomment(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
    // onSuccess:(newData) => {
    //     queryClient.setQueryData([QueryKeys.comment.getComments], (oldData) => {
    //         return {...oldData, newData};

    //     })
    // }
  });
};

/**
 *@description 답글 수정 api 요청
 */
const patchRecomment = async ({
  commentId,
  recommentId,
  content,
}: PatchRecommentData) => {
  return apiCall<boolean>({
    method: 'PATCH',
    url: `comments/${commentId}/${recommentId}`,
    data: {
      content,
    },
  });
};

export const usePatchRecomment = () => {
  return useMutation((data: PatchRecommentData) => patchRecomment(data));
};

/**
 *@description 답글 고마워요 등록/취소 api 요청
 *@param isThank : true 면 등록, false 면 취소
 */
const postRecommentThank = async ({
  commentId,
  recommentId,
  isThank,
}: PostRecommentThankData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `comments/${commentId}/${recommentId}/thanks${
      isThank ? '' : '/cancel'
    }`,
  });
};

export const usePostRecommentThank = () => {
  return useMutation((data: PostRecommentThankData) =>
    postRecommentThank(data),
  );
};
