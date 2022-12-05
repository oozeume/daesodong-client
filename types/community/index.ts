// 게시글 등록/수정 폼
export interface FormState {
  community?: string;
  title: string;
  content: string;
}

// 게시글 등록, 수정 타입
export interface FormType {
  type: 'REGISTER' | 'MODIFY';
}
