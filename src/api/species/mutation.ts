import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';
import {PostSpeciesData} from '../../../types/api/species';

/**
 *@description 동물 종 등록 api 호출
 *@todo 동물 종 등록을 추후, admin 제거한 api로 변경
 */
const postSpecies = (data: PostSpeciesData) => {
  return apiCall<boolean>({
    method: 'POST',
    url: `admin/species`,
    data,
  });
};

export const usePostSpecies = () => {
  return useMutation((data: PostSpeciesData) => postSpecies(data));
};
