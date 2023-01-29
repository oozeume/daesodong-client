import {useMutation, useQuery} from '@tanstack/react-query';
import {
  PostAuthNicknameCheckBody,
  PostAuthEmailCheckBody,
  PostAuthEmailLoginBody,
  PostAuthEmailLoginResponse,
  PostAuthMobileVerifyBody,
  PostAuthMobileVerifyCodeBody,
  PostAuthSignupBody,
  PostAuthSocialLoginData,
} from '~/../types/api/auth';
import {apiCall} from '../common';

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
