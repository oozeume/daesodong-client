import {useMutation, useQuery} from '@tanstack/react-query';
import {
  PostAuthEmailLoginBody,
  PostAuthEmailLoginResponse,
  PostAuthMobileVerifyBody,
  PostAuthMobileVerifyCodeBody,
  PostAuthSignupBody,
} from '~/../types/api/auth';
import {apiCall} from '../common';

/**
 *@description 닉네임 확인 api
 */
const getAuthNickname = (nickname: string) => {
  return apiCall<boolean>({
    method: 'GET',
    url: `auth/${nickname}`,
  });
};

/**
 *@description 이메일 로그인 api
 */
const postAuthEmailLogin = (data: PostAuthEmailLoginBody) => {
  return apiCall<PostAuthEmailLoginResponse>({
    method: 'POST',
    url: `auth/login`,
    data,
  });
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
 *@description 전화 번호 인증 코드 발송 api
 *@param {string} mobile - 핸드폰 번호
 */
const postAuthMobileVerify = async (data: PostAuthMobileVerifyBody) => {
  return apiCall<string>({
    method: 'POST',
    url: `auth/verify`,
    data,
  });
};

/**
 *@description 전화 번호 인증 코드 확인 api
 *@param {string} mobile - 핸드폰 번호
 *@param {string} code - 인증 번호
 */
const postAuthMobileVerifyCode = async (data: PostAuthMobileVerifyCodeBody) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/verify/code`,
    data,
  });
};

/**
 *@description 닉네임 확인 api
 */
export const useGetAuthNickname = (nickname: string) => {
  return useQuery(['nickname', nickname], () => getAuthNickname(nickname), {
    enabled: false,
  });
};

/**
 *@description 이메일 로그인 api
 */
export const usePostAuthEmailLogin = () => {
  return useMutation((data: PostAuthEmailLoginBody) =>
    postAuthEmailLogin(data),
  );
};

/**
 *@description 이메일 회원가입 api
 */
export const usePostAuthEmailSignup = () => {
  return useMutation((data: PostAuthSignupBody) => postAuthEmailSignup(data));
};

/**
 *@description 전화 번호 인증 코드 발송 api
 */
export const usePostAuthMobileVerify = () => {
  return useMutation((body: PostAuthMobileVerifyBody) =>
    postAuthMobileVerify(body),
  );
};

/**
 *@description 전화 번호 인증 코드 확인 api
 */
export const usePostAuthMobileVerifyCode = () => {
  return useMutation((body: PostAuthMobileVerifyCodeBody) =>
    postAuthMobileVerifyCode(body),
  );
};
