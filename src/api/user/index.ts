import {useMutation} from '@tanstack/react-query';
import {PatchUserInfoResponse} from '~/../types/api/user';
import {PetInfoForm} from '~/../types/signup';
import {apiCall} from '../common';

/**
 *@description 이메일 로그인 api
 */
const patchUserInfo = (data: PetInfoForm) => {
  return apiCall<PatchUserInfoResponse>({
    method: 'PATCH',
    url: `users/info`,
    data,
  });
};

/**
 *@description 이메일 회원가입 api
 */
export const usePatchUserInfo = () => {
  return useMutation((data: PetInfoForm) => patchUserInfo(data));
};
