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
const getAuthNickname = async (nickname: string) => {
  try {
    return apiCall<boolean>({
      method: 'GET',
      url: `auth/${nickname}`,
    });
  } catch (error: any) {
    console.error(error);
  }
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
 *@description 이메일 회원가입
 *@param {string} email
 *@param {string} nickname
 *@param {string} password
 *@param {string} mobile
 */
const postAuthEmailSignup = async (data: PostAuthSignupBody) => {
  try {
    const _data = {
      email: 'test12@test.com',
      nickname: 'test12',
      password: 'test1234',
      mobile: '01012340012',
    };

    return apiCall<{access: string; refresh: string}>({
      method: 'POST',
      url: `auth/signup`,
      data,
    });
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

/**
 *@description 전화 번호 인증 발송
 *@param {string} mobile - 핸드폰 번호
 */
const postAuthMobileVerify = async (data: PostAuthMobileVerifyBody) => {
  return apiCall<string>({
    method: 'POST',
    url: `auth/verify`,
    data,
  });
};

const postAuthMobileVerifyCode = async (data: {code: string}) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `auth/verify/code`,
    data,
  });
};

export const useGetAuthNickname = (nickname: string) => {
  return useQuery(['nickname', nickname], () => getAuthNickname(nickname), {
    enabled: false,
  });
};

export const usePostAuthEmailLogin = () => {
  return useMutation((data: PostAuthEmailLoginBody) =>
    postAuthEmailLogin(data),
  );
};

export const usePostAuthEmailSignup = () => {
  return useMutation((data: PostAuthSignupBody) => postAuthEmailSignup(data));
};

export const usePostAuthMobileVerify = () => {
  return useMutation((body: PostAuthMobileVerifyBody) =>
    postAuthMobileVerify(body),
  );
};

export const usePostAuthMobileVerifyCode = () => {
  return useMutation((body: PostAuthMobileVerifyCodeBody) =>
    postAuthMobileVerifyCode(body),
  );
};
