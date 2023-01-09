import {useMutation} from '@tanstack/react-query';
import {PatchUserInfoBody, PatchUserInfoResponse} from '~/../types/api/user';
import {PetInfoForm} from '~/../types/signup';
import {apiCall} from '../common';

/**
 *@description 유저 정보 수정 api
 */
const patchUserInfo = (data: PatchUserInfoBody) => {
  return apiCall<PatchUserInfoResponse>({
    method: 'PATCH',
    url: `users/info`,
    data,
  });
};

/**
 *@description 유저 정보 수정 api hook
 */
export const usePatchUserInfo = () => {
  return useMutation((data: PatchUserInfoBody) => patchUserInfo(data));
};
