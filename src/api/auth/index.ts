import {useMutation, useQuery} from '@tanstack/react-query';
import {
  PostAuthEmailLoginData,
  PostAuthSignupData,
  PostAuthVerifyData,
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
const postAuthEmailLogin = async (data: PostAuthEmailLoginData) => {
  try {
    return apiCall<{access: string; refresh: string}>({
      method: 'POST',
      url: `auth/login`,
      data,
    });
  } catch (error: any) {
    console.error(error);
  }
};

/**
 *@description 이메일 회원가입
 *@param {string} email
 *@param {string} nickname
 *@param {string} password
 *@param {string} mobile
 */
const postAuthEmailSignup = async (data: PostAuthSignupData) => {
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
  } catch (error: any) {
    console.error(error);
  }
};

/**
 *@description 전화 번호 인증
 *@param {string} mobile - 핸드폰 번호
 */
const postAuthVerify = async (data: PostAuthVerifyData) => {
  try {
    return apiCall<string>({
      method: 'POST',
      url: `auth/verify`,
      data,
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const useGetAuthNickname = (nickname: string) => {
  return useQuery(['nickname', nickname], () => getAuthNickname(nickname));
};

export const usePostAuthEmailLogin = () => {
  return useMutation((data: PostAuthEmailLoginData) =>
    postAuthEmailLogin(data),
  );
};

export const usePostAuthEmailSignup = () => {
  return useMutation((data: PostAuthSignupData) => postAuthEmailSignup(data));
};

export const usePostAuthVerify = () => {
  return useMutation((body: PostAuthVerifyData) => postAuthVerify(body));
};
