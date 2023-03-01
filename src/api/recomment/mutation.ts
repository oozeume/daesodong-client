import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import {
  DeleteRecommentQuery,
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
  const queryClient = useQueryClient();

  return useMutation((data: PatchRecommentData) => patchRecomment(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};

/**
 *@description 답글 삭제 api
 */
const deleteRecomment = ({commentId, recommentId}: DeleteRecommentQuery) => {
  return apiCall<boolean>({
    method: 'DELETE',
    url: `comments/${commentId}/${recommentId}`,
  });
};

export const useDeleteRecomment = (query: DeleteRecommentQuery) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return deleteRecomment(query);
    },
    {
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.comment.getComments]),
    },
  );
};

/**
 *@description 답글 고마워요 등록/취소 api 요청
 *@param isOn : true 면 등록, false 면 취소
 */
const postRecommentThank = async ({
  commentId,
  recommentId,
  isOn,
}: PostRecommentThankData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `comments/${commentId}/${recommentId}/thanks${isOn ? '' : '/cancel'}`,
  });
};

export const usePostRecommentThank = () => {
  return useMutation((data: PostRecommentThankData) =>
    postRecommentThank(data),
  );
};
