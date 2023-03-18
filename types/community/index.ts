import {PostCloudImageData} from '../utils';

// 게시글 등록/수정 폼
export interface FormState {
  kind: string;
  title: string;
  content: string;
  tags?: string[];
  pictures?: string[];
}

export type CommentUserInfo = {
  nickname: string;
  pets: CommentUerPetItem[];
};

export type CommentUerPetItem = {
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
};

export type CommentItem = {
  id: string;
  userId: string;
  content: string | null;
  thanks: number;
  postId: string;
  delete_at: string | null;
  created_at: string;
  updated_at: string;
  comment1Id?: string;
  comment2?: CommentItem[];
  user: CommentUserInfo;
  best_score: number;
  thanks_comment1_join?: {
    comment1Id: string;
    userId: string;
  }[];

  thanks_comment2_join?: {
    comment2Id: string;
    userId: string;
  }[];
};

/**
 *@description 현재 댓글 입력 부분 타입
 */
export type CommentInputType =
  | 'POST_COMMENT'
  | 'POST_RECOMMENT'
  | 'PATCH_COMMENT'
  | 'PATCH_RECOMMENT';

/**
 *@description 삭제 팝업 on/off 여부
 */
export type OpenDeletePopup = {
  post: boolean;
  comment: boolean;
  recomment: boolean;
};

/**
 *@description 커뮤니티 컨텐츠 이미지 데이터
 */
export interface CommunityContentImage {
  postId: string;
  url?: string;
}

/**
 *@description 커뮤니티 게시글 등록 페이지 > 이미지 데이터
 */
export interface RegisterImageData {
  // 게시글 작성 페이지에서 보여질 이미지 이름(클라우드 혹은 로컬 이미지 이름)
  registerPageImageName: string;
  // 클라우드에 등록되어있는 이미지 이름 (실제로 게시글 폼 데이터로 보낼 데이터)
  cloudImageName: string;
  // 클라우드에 올릴 이미지 데이터
  cloudData?: PostCloudImageData;
  // 서버 db에 이미지 이름이 등록되어 있는지 여부
  type: 'REGISTERED' | 'UNREGISTERED';
}
