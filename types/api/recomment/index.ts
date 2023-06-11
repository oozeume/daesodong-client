export interface PostRecommentData {
  commentId: string;
  content: string;
  toUser: string;
}

export interface PatchRecommentData {
  commentId: string;
  recommentId: string;
  content: string;
  toUser: string;
}

export interface DeleteRecommentQuery {
  commentId: string;
  recommentId: string;
}

export interface PostRecommentThankData {
  commentId: string;
  recommentId: string;
  isOn: boolean;
}
