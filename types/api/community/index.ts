import {FormState} from '../../community';

// 커뮤니티 게시글 등록 폼 데이터
export interface PostCummunityPostData extends FormState {}

// 커뮤니티 게시글 등록 응답
export interface PostCummunityPostResponse {
  //
}

// 커뮤니티 게시글 수정 폼 데이터
export interface PatchCommunityPost {
  //
}

// 커뮤니티 게시글 수정 응답
export interface PatchCommunityResponse {
  //
}

// 커뮤니티 게시글 리스트 조회 쿼리
export interface GetCommunityPostListQuery {
  limit: number;
  community?: string;
  // latest or view
  sort: string;
  cursor?: string;
}

// 커뮤니티 게시글 조회 응답 리스트 아이템
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
