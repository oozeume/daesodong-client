import {useQuery, useQueryClient} from '@tanstack/react-query';
import {ReviewType} from '~/../types/facility';
import QueryKeys from '~/constants/queryKeys';

type ReviewCompleteType = {
  type: ReviewType;
  isComplete: boolean;
};

// 리뷰 작성/수정 유무 state를 확인하는 hook

export const useReviewRegister = () => {
  const queryClient = useQueryClient();

  return (isRegisterComplete: ReviewCompleteType) =>
    queryClient.setQueryData(
      QueryKeys.facility.review.registerComplete,
      isRegisterComplete,
    );
};

export const useReviewRegisterContext = (initialData: {
  type: ReviewType.Register;
  isComplete: false;
}) =>
  useQuery(QueryKeys.facility.review.registerComplete, {
    initialData,
    staleTime: Infinity,
  }).data;
