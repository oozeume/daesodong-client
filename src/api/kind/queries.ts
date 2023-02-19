import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import {GetPetKindsResponse} from '~/../types/api/kind';

/**
 *@description 동물 종류 리스트 조회 api (ex. 설치류, 포유류 파충류 등등.)
 */
const getPetKinds = () => {
  return apiCall<GetPetKindsResponse>({
    method: 'GET',
    url: `kinds`,
  });
};

/**
 *@description동물 종류 리스트 조회 api hook (ex. 설치류, 포유류 파충류 등등.)
 */
export const useGetPetKinds = (enabled?: boolean) => {
  return useQuery(
    ['get-kinds'],
    () => {
      return getPetKinds();
    },
    {
      enabled,
      select: data => {
        return data.data.map(item => item.name);
      },
    },
  );
};
