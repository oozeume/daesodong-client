import {useQuery, useQueryClient} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
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
  commentId: string;
  recommentId: string;
}

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

  return useQuery(
    [QueryKeys.comment.deleteComment],
    () => {
      return deleteRecomment(query);
    },
    {
      enabled: false,
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.comment.getComments]),
    },
  );
};
