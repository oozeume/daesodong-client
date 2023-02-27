import {useQuery, useQueryClient} from '@tanstack/react-query';
import QueryKeys from '~/constants/queryKeys';

// 리뷰 작성 유무 state를 확인하는 hook

export const useReviewRegister = () => {
  const queryClient = useQueryClient();
  return (isRegisterComplete: boolean) =>
    queryClient.setQueryData(
      QueryKeys.facility.review.registerComplete,
      isRegisterComplete,
    );
};

export const useReviewRegisterContext = (initialData: boolean) =>
  useQuery(QueryKeys.facility.review.registerComplete, {
    initialData,
    staleTime: Infinity,
  }).data;
