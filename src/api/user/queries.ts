import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import QueryKeys from '~/constants/queryKeys';
import _ from 'lodash';
import {GetUserResponse} from '~/../types/api/user';
import User from '~/model/user';

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
      select: data => {
        const _user = new User(data.data);
        return _user;
      },
    },
  );
};
