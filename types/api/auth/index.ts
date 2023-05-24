import {GenderType} from '../../common';
import {SignupForm} from '../../signup';

// 이메일 회원가입 api 전송 데이터
export type PostAuthSignupBody = SignupForm;

// 소셜 회원가입 api 전송 데이터
export type PostAuthSocialSignupData = {
  email: SignupForm['email'];
  nickname: SignupForm['nickname'];
  mobile: SignupForm['mobile'];
};

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

// 소셜 로그인 api 응답
export interface PostAuthSocialLoginResponse
  extends Partial<PostAuthEmailLoginResponse> {
  email: string;
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

export interface PostAuthMobileVerifyCodeResponse {
  address: string | null;
  birthdate: string | null;
  created_at: string;
  email: string;
  gender: GenderType;
  id: string;
  mobile: string;
  nickname: string;
  role: string;
  social: string[] | null;
  updated_at: string | null;
}

// 비밀번호 변경 api 전송 데이터
export interface PostAuthResetPasswordData {
  email: string;
  password: string;
}

/**
 *@description 토큰 업데이트 api 응답
 */

export interface PostAuthRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
