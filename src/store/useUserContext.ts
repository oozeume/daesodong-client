import {useQuery, useQueryClient} from '@tanstack/react-query';
import StoreQueryKeys from '~/constants/queryKeys/store';

type userData = {
  userId: string;
  petSpecieName: string;
};

/**
 *@description 유저 정보 전역으로 확인하는 hook
 */

export const useUserRegister = () => {
  const queryClient = useQueryClient();

  return (user: userData) =>
    queryClient.setQueryData([StoreQueryKeys.user], user);
};

export const useUserContext = (initialData: userData) =>
  useQuery([StoreQueryKeys.user], {
    initialData,
    staleTime: Infinity,
  }).data;
