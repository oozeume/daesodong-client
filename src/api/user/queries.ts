import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import _ from 'lodash';

interface GetUserResponse {
  id: string;
  nickname: string;
  gender: 'Male' | 'Female';
  birthdate?: string | null;
  address?: string | null;
  email?: string | null;
  mobile: string;
  social?: string | null;
  created_at: string;
  updated_at: string;
  pets: any[];
}

/**
 *@description 유저 정보 조회
 */
const getUser = async () => {
  return apiCall<GetUserResponse>({
    method: 'GET',
    url: `users`,
  });
};

export const useGetUser = (enabled?: boolean) => {
  return useQuery(
    [QueryKeys.user.getUser],
    () => {
      return getUser();
    },
    {
      enabled,
    },
  );
};
