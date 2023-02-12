// 작성한 태그 전역으로 확인하는 hook

import {useQuery, useQueryClient} from '@tanstack/react-query';
import QueryKeys from '~/constants/queryKeys';

export const useTagRegister = () => {
  const queryClient = useQueryClient();

  return (tagList: string[]) =>
    queryClient.setQueryData(QueryKeys.tags, tagList);
};

export const useTagContext = (initialData: string[]) =>
  useQuery(QueryKeys.tags, {
    initialData,
    staleTime: Infinity,
  }).data;
