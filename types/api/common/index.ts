import {RegisterImageData} from '~/../types/community';

// 서버 에러 응답 타입
export interface ErrorResponse {
  message: string;
  statusCode: number;
  path: string;
}

export interface ErrorResponseTransform extends ErrorResponse {
  success: 'FAIL';
}

// 이미지 수정, 등록에 사용 가능한 이미지 데이터
export type PostImageData = RegisterImageData[] & string[];
