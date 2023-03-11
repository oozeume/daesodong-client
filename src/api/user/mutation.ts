import {useMutation} from '@tanstack/react-query';
import {
  DeleteUserData,
  PatchUserData,
  PatchUserInfoData,
  PatchUserInfoResponse,
} from '~/../types/api/user';
import {apiCall} from '../common';

/**
 *@description 유저 수정 api
 */
const patchUser = (data: PatchUserData) => {
  return apiCall<boolean>({
    method: 'PATCH',
    url: `users`,
    data,
  });
};

/**
 *@description 유저 수정 api hook
 */
export const usePatchUser = () => {
  return useMutation((data: PatchUserData) => patchUser(data));
};

/**
 *@description 유저 부가 정보 수정 api
 */
const patchUserInfo = (_data: PatchUserInfoData) => {
  const data = {
    ..._data,
    birthdate: _data.birthDate,
    pet_picture_url: _data.petPictureUrl,
  };

  delete data.birthDate;
  delete data.petPictureUrl;

  return apiCall<PatchUserInfoResponse>({
    method: 'PATCH',
    url: `users/info`,
    data,
  });
};

/**
 *@description 유저 부가 정보 수정 api hook
 */
export const usePatchUserInfo = () => {
  return useMutation((data: PatchUserInfoData) => patchUserInfo(data));
};

/**
 *@description 회원탈퇴 api
 */
const deleteUser = (data: DeleteUserData) => {
  return apiCall<boolean>({
    method: 'DELETE',
    url: `users`,
    data,
  });
};

/**
 *@description 회원탈퇴 api hook
 */
export const useDeleteUser = () => {
  return useMutation((data: DeleteUserData) => deleteUser(data));
};
