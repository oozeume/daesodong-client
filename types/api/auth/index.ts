import {SignupForm} from '../../login';

// 이메일 회원가입 api 데이터
export type PostAuthSignupBody = SignupForm;

// 이메일 로그인 api 데이터
export interface PostAuthEmailLoginBody {
  email: string;
  password: string;
}

// 전화번호 확인 api 데이터
export interface PostAuthMobileVerifyBody {
  mobile: string;
}

export interface PostAuthMobileVerifyCodeBody {
  code: string;
}

export interface PostAuthEmailLoginResponse {
  access: string;
  refresh: string;
}
