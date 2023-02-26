export interface PostRecommentData {
  commentId: string;
  content: string;
}

export interface PatchRecommentData {
  commentId: string;
  recommentId: string;
  content: string;
}

export interface PostRecommentThankData {
  commentId: string;
  recommentId: string;
  isThank: boolean;
}
