import {useMutation} from '@tanstack/react-query';
import {FacilityReviewData} from '~/../types/api/facility';
import {apiCall} from '~/api/common';

/**
 *@description 병원 방문 API
 */

const mutationVisitedFacility = (id: string) => {
  return apiCall<any>({
    method: 'POST',
    url: `/hospitals/${id}/visits`,
  });
};

export const useMutationVisitedFacility = () => {
  return useMutation((id: string) => mutationVisitedFacility(id));
};

/**
 *@description 시설 리뷰 작성 API
 */

const mutationReviewRegister = (data: FacilityReviewData, id: string) => {
  return apiCall<FacilityReviewData>({
    method: 'POST',
    url: `hospitals/${id}/reviews`,
    data,
  });
};

export const useMutationReviewRegister = (id: string) => {
  return useMutation((data: any) => mutationReviewRegister(data, id));
};
