import {SignupForm} from '../../signup';

// 이메일 회원가입 api 전송 데이터
export type PostAuthSignupBody = SignupForm;

// 이메일 로그인 api 전송 데이터
export interface PostAuthEmailLoginData {
  email: string;
  password: string;
}

// 소셜 로그인 api 전송 데이터
export interface PostAuthSocialLoginData {
  social: 'Apple' | 'Kakao' | 'Google';
  token: string;
}

// 이메일 로그인 api 응답
export interface PostAuthEmailLoginResponse {
  access: string;
  refresh: string;
}

export interface PostAuthNicknameCheckData {
  nickname: string;
}

// 이메일 확인 api 전송 데이터
export interface PostAuthEmailCheckData {
  email: string;
}

// 전화번호 인증 코드 발송 api 전송 데이터
export interface PostAuthMobileVerifyData {
  mobile: string;
}

// 전화번호 인증 코드 확인 api 전송 데이터
export interface PostAuthMobileVerifyCodeData {
  code: string;
  mobile: string;
}

// 비밀번호 변경 api 전송 데이터
export interface PostAuthResetPasswordData {
  email: string;
  password: string;
}
