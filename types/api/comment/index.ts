import {CommentItem} from '../../community';

// 등록 댓글 데이터
export interface PostCommentData {
  postId: string;
  content: string;
}

// 수정 댓글 데이터
export interface PatchCommentData {
  postId: string;
  commentId: string;
  content: string;
}

// 댓글 고마워요 전송 데이터
export interface PostCommentThankData {
  postId: string;
  commentId: string;
  isOn: boolean;
}

export interface DeleteCommentQuery {
  postId: string;
  commentId: string;
}

// 댓글 리스트 조회 쿼리
export interface GetCommentListQuery {
  limit: number;
  cursor?: string;
}

// 댓글 리스트 조회 응답
export type GetCommentListResponse = CommentItem[];
