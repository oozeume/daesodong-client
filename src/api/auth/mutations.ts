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
} from '~/../types/api/auth';
import {apiCall} from '../common';

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
 *@description 전화 번호 인증 코드 발송 api
 *@param {string} mobile - 핸드폰 번호
 */
const postAuthMobileVerify = async (data: PostAuthMobileVerifyData) => {
  return apiCall<string>({
    method: 'POST',
    url: `auth/verify`,
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
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/verify/code`,
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
  return apiCall<string>({
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
