import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import queryString from 'query-string';
import {GetCommunityPostResponse} from '~/../types/api/community';

export interface GetCommentListResponse {
  id: string;
  userId: string;
  content: string | null;
  thanks: number;
  postId: string;
  delete_at: string | null;
  created_at: string;
  updated_at: string | null;
  comment2: [];
  user: {
    nickname: string;
    pets: {
      id: string;
      userId: string;
      name: string | null;
      age: number;
      sex: 'Male' | 'Female';
      specieId: string;
      concern: string | null;
      pet_picture_url: string | null;
      created_at: string;
      updated_at: string | null;
      specie: {
        name: string;
      };
    }[];
  };
}

/**
 *@description 댓글 리스트 조회 api
 */
const getCommentList = (postId: string) => {
  return apiCall<GetCommentListResponse[]>({
    method: 'GET',
    url: `posts/${postId}/comments`,
  });
};

export const useGetCommentList = (postId: string) => {
  return useQuery([QueryKeys.comment.getComments], () => {
    return getCommentList(postId);
  });
};

interface DeleteCommentQuery {
  postId: number;
  commentId: number;
}

/**
 *@description 댓글 삭제 api
 */
const deleteComment = ({postId, commentId}: DeleteCommentQuery) => {
  return apiCall<boolean>({
    method: 'DELETE',
    url: `posts/${postId}/comments${commentId}`,
  });
};

export const useDeleteComment = (query: DeleteCommentQuery) => {
  return useQuery([QueryKeys.comment.deleteComment], () => {
    return deleteComment(query);
  });
};
