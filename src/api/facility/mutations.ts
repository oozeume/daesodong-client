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

/**
 *@description 시설 리뷰 수정 API
 */

const patchReviewEdit = (
  data: PostFacilityReviewData,
  id: string,
  reviewId: string,
) => {
  return apiCall<PostFacilityReviewData>({
    method: 'PATCH',
    url: `hospitals/${id}/reviews/${reviewId}`,
    data,
  });
};

export const useMutationReviewEdit = (id: string, reviewId: string) => {
  return useMutation((data: PostFacilityReviewData) =>
    patchReviewEdit(data, id, reviewId),
  );
};

/**
 *@description 시설 리뷰 삭제 API
 */

const deleteReview = (id: string, reviewId: string) => {
  return apiCall({
    method: 'DELETE',
    url: `hospitals/${id}/reviews/${reviewId}`,
  });
};

export const useMutationReviewDelete = (id: string, reviewId: string) => {
  return useMutation(() => deleteReview(id, reviewId));
};
