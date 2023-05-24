import {useMutation} from '@tanstack/react-query';
import {
  PostAuthNicknameCheckData,
  PostAuthEmailCheckData,
  PostAuthEmailLoginData,
  PostAuthEmailLoginResponse,
  PostAuthMobileVerifyData,
  PostAuthMobileVerifyCodeData,
  PostAuthSignupBody,
  PostAuthSocialLoginData,
  PostAuthResetPasswordData,
  PostAuthMobileVerifyCodeResponse,
  PostAuthRefreshResponse,
  PostAuthSocialLoginResponse,
  PostAuthSocialSignupData,
} from '~/../types/api/auth';
import {apiCall} from '../common';
import {
  getSecurityData,
  removeSecurityData,
  setSecurityData,
} from '~/utils/storage';
import {config} from '~/utils/config';

/**
 *@description 닉네임 확인 api
 */
const postAuthNicknameCheck = (data: PostAuthNicknameCheckData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/nickname`,
    data,
  });
};

/**
 *@description 닉네임 확인 api hook
 */
export const usePostAuthNicknameCheck = () => {
  return useMutation((data: PostAuthNicknameCheckData) =>
    postAuthNicknameCheck(data),
  );
};

/**
 *@description 이메일 확인 api
 */
const postAuthEmailCheck = (data: PostAuthEmailCheckData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/email`,
    data,
  });
};

/**
 *@description 이메일 확인 api hook
 */
export const usePostAuthEmailCheck = () => {
  return useMutation((data: PostAuthEmailCheckData) =>
    postAuthEmailCheck(data),
  );
};

/**
 *@description 이메일 로그인 api
 */
const postAuthEmailLogin = (data: PostAuthEmailLoginData) => {
  return apiCall<PostAuthEmailLoginResponse>({
    method: 'POST',
    url: `auth/login`,
    data,
  });
};

/**
 *@description 이메일 로그인 api hook
 */
export const usePostAuthEmailLogin = () => {
  return useMutation((data: PostAuthEmailLoginData) =>
    postAuthEmailLogin(data),
  );
};

/**
 *@description 이메일 회원가입 api
 *@param {string} email
 *@param {string} nickname
 *@param {string} password
 *@param {string} mobile
 */
const postAuthEmailSignup = (data: PostAuthSignupBody) => {
  return apiCall<{access: string; refresh: string}>({
    method: 'POST',
    url: `auth/signup`,
    data,
  });
};

/**
 *@description 이메일 회원가입 api hook
 */
export const usePostAuthEmailSignup = () => {
  return useMutation((data: PostAuthSignupBody) => postAuthEmailSignup(data));
};

/**
 *@description 소셜 회원가입 api
 *@param {string} email
 *@param {string} nickname
 *@param {string} mobile
 */
const postAuthSocialSignup = (data: PostAuthSocialSignupData) => {
  return apiCall<{access: string; refresh: string}>({
    method: 'POST',
    url: `auth/social/signup`,
    data,
  });
};

/**
 *@description 소셜 회원가입 api hook
 */
export const usePostAuthSocialSignup = () => {
  return useMutation((data: PostAuthSocialSignupData) =>
    postAuthSocialSignup(data),
  );
};

/**
 *@description 전화 번호 인증 코드 발송 api
 *@param {string} mobile - 핸드폰 번호
 */
const postAuthMobileVerify = async (data: PostAuthMobileVerifyData) => {
  return apiCall<string>({
    method: 'POST',
    url: `auth/code`,
    data,
  });
};

/**
 *@description 전화 번호 인증 코드 발송 api hook
 */
export const usePostAuthMobileVerify = () => {
  return useMutation((body: PostAuthMobileVerifyData) =>
    postAuthMobileVerify(body),
  );
};

/**
 *@description 전화 번호 인증 코드 확인 api
 *@param {string} mobile - 핸드폰 번호
 *@param {string} code - 인증 번호
 */
const postAuthMobileVerifyCode = async (data: PostAuthMobileVerifyCodeData) => {
  return apiCall<PostAuthMobileVerifyCodeResponse>({
    method: 'POST',
    url: `auth/code/verification`,
    data,
  });
};

/**
 *@description 전화 번호 인증 코드 확인 api hook
 */
export const usePostAuthMobileVerifyCode = () => {
  return useMutation((body: PostAuthMobileVerifyCodeData) =>
    postAuthMobileVerifyCode(body),
  );
};

/**
 *@description 소셜 로그인 api
 */
const postAuthSocialLogin = (data: PostAuthSocialLoginData) => {
  return apiCall<PostAuthSocialLoginResponse>({
    method: 'POST',
    url: `auth/social/login`,
    data,
  });
};

/**
 *@description 소셜 로그인 api hook
 */
export const usePostAuthSocialLogin = () => {
  return useMutation((data: PostAuthSocialLoginData) =>
    postAuthSocialLogin(data),
  );
};

/**
 *@description 비밀번호 변경 api
 */
const postAuthResetPassword = (data: PostAuthResetPasswordData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/reset/password`,
    data,
  });
};

/**
 *@description 비밀번호 변경 api hook
 */
export const usePostAuthResetPassword = () => {
  return useMutation((data: PostAuthResetPasswordData) =>
    postAuthResetPassword(data),
  );
};

/**
 *@description 토큰 업데이트
 *@todo 추후 api 수정으로 refresh token이 응답에서 사라지면 해당 로직 수정
 */
const postAuthRefresh = async () => {
  try {
    const refreshToken = await getSecurityData(config.REFRESH_TOKEN_NAME);

    /**
     *@todo form data로 보내기
     */
    const response = await apiCall<PostAuthRefreshResponse>({
      method: 'POST',
      url: `auth/refresh`,
      data: {
        refreshToken,
      },
    });

    setSecurityData(config.ACCESS_TOKEN_NAME, response.data.accessToken);
    setSecurityData(config.REFRESH_TOKEN_NAME, response.data.refreshToken);

    return true;
  } catch (error) {
    removeSecurityData(config.ACCESS_TOKEN_NAME);
    removeSecurityData(config.REFRESH_TOKEN_NAME);

    throw false;
  }
};

export const usePostAuthRefresh = () => {
  return useMutation(() => postAuthRefresh());
};
