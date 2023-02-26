import {useMutation} from '@tanstack/react-query';
import {
  PostFacilityReviewData,
  PostVisitedFacilityResponse,
} from '~/../types/api/facility';
import {apiCall} from '~/api/common';

/**
 *@description 병원 방문 API
 */

const postVisitedFacility = (id: string) => {
  return apiCall<PostVisitedFacilityResponse>({
    method: 'POST',
    url: `/hospitals/${id}/visits`,
  });
};

export const useMutationVisitedFacility = () => {
  return useMutation((id: string) => postVisitedFacility(id));
};

/**
 *@description 시설 리뷰 작성 API
 */

const postReviewRegister = (data: PostFacilityReviewData, id: string) => {
  return apiCall<PostFacilityReviewData>({
    method: 'POST',
    url: `hospitals/${id}/reviews`,
    data,
  });
};

export const useMutationReviewRegister = (id: string) => {
  return useMutation((data: any) => postReviewRegister(data, id));
};
