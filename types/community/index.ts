// 게시글 등록/수정 폼
export interface FormState {
  kind: string;
  title: string;
  content: string;
  tags?: string[];
  pictures?: string[];
}

// 게시글 등록, 수정 타입
export interface FormType {
  type: 'REGISTER' | 'MODIFY';
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
  updated_at: string | null;
  comment1Id?: string;
  comment2?: CommentItem[];
  user: CommentUserInfo;
};

export type CommentInputType =
  | 'POST_COMMENT'
  | 'POST_RECOMMENT'
  | 'PATCH_COMMENT'
  | 'PATCH_RECOMMENT';

export type OpenDeletePopup = {
  post: boolean;
  comment: boolean;
  recomment: boolean;
};
