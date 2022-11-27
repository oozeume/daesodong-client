import {SignupForm} from '../../login';

// 이메일 회원가입 api 데이터
export type PostAuthSignupData = SignupForm;

// 이메일 로그인 api 데이터
export interface PostAuthEmailLoginData {
  email: string;
  password: string;
}

// 전화번호 확인 api 데이터
export interface PostAuthVerifyData {
  mobile: string;
}
