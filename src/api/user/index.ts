import {useMutation} from '@tanstack/react-query';
import {PatchUserInfoBody, PatchUserInfoResponse} from '~/../types/api/user';
import {apiCall} from '../common';

/**
 *@description 유저 정보 수정 api
 */
const patchUserInfo = (_data: PatchUserInfoBody) => {
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
 *@description 유저 정보 수정 api hook
 */
export const usePatchUserInfo = () => {
  return useMutation((data: PatchUserInfoBody) => patchUserInfo(data));
};
