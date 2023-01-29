/**
 * @@@ api 전송 바디
 */

import {SignupForm} from '../../signup';

// 이메일 회원가입 api 전송 바디
export type PostAuthSignupBody = SignupForm;

// 이메일 로그인 api 전송 바디
export interface PostAuthEmailLoginBody {
  email: string;
  password: string;
}

// 소셜 로그인 api 전송 데이터
export interface PostAuthSocialLoginData {
  social: 'Apple' | 'Kakao' | 'Google';
  token: string;
}

export interface PostAuthNicknameCheckBody {
  nickname: string;
}

// 이메일 확인 api 전송 바디
export interface PostAuthEmailCheckBody {
  email: string;
}

// 전화번호 인증 코드 발송 api 전송 바디
export interface PostAuthMobileVerifyBody {
  mobile: string;
}

// 전화번호 인증 코드 확인 api 전송 바디
export interface PostAuthMobileVerifyCodeBody {
  code: string;
  mobile: string;
}

/**
 * @@@ 응답 데이터
 */

// 이메일 로그인 api 응답 데이터
export interface PostAuthEmailLoginResponse {
  access: string;
  refresh: string;
}
