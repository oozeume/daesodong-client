import {useMutation} from '@tanstack/react-query';
import {
  PostFacilityReviewData,
  PostRecommandFacilityType,
  PostReportData,
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

/**
 *@description 병원 북마크 API
 */

const postFacilityBookmark = (id: string) => {
  return apiCall({
    method: 'POST',
    url: `/hospitals/${id}/bookmarks`,
  });
};

export const useMutationFaciltiyBookmark = (id: string) => {
  return useMutation(() => postFacilityBookmark(id));
};

/**
 *@description 병원 북마크 취소 API
 */

const postFacilityBookmarkCancel = (id: string) => {
  return apiCall({
    method: 'POST',
    url: `/hospitals/${id}/bookmarks/cancel`,
  });
};

export const useMutationFaciltiyBookmarkCancel = (id: string) => {
  return useMutation(() => postFacilityBookmarkCancel(id));
};

/**
 *@description 시설 리뷰 고마워요 API
 */

const postThanksReview = (id: string, reviewId: string) => {
  return apiCall({
    method: 'POST',
    url: `hospitals/${id}/reviews/${reviewId}/thanks`,
  });
};

export const usePostThanksReview = (id: string, reviewId: string) => {
  return useMutation(() => postThanksReview(id, reviewId));
};

/**
 *@description 시설 리뷰 고마워요 취소 API
 */

const postThanksCancelReview = (id: string, reviewId: string) => {
  return apiCall({
    method: 'POST',
    url: `hospitals/${id}/reviews/${reviewId}/thanks/cancel`,
  });
};

export const usePostThanksCancelReview = (id: string, reviewId: string) => {
  return useMutation(() => postThanksCancelReview(id, reviewId));
};

/**
 *@description 유저 신고
 */

const postReportUser = (data: PostReportData) => {
  return apiCall({
    method: 'POST',
    url: '/report-user',
    data,
  });
};

export const usePostReportUser = () => {
  return useMutation((data: PostReportData) => postReportUser(data));
};

/**
 *@description 시설 추천
 */

const postRecommandFacility = (data: any) => {
  return apiCall({
    method: 'POST',
    url: 'hospitals',
    data,
  });
};

export const usePostRecommandFacility = () => {
  return useMutation((data: PostRecommandFacilityType) =>
    postRecommandFacility({
      hospitalCategoryName: data.type,
      name: data.facilityName,
      address1: data.address,
      address2: data.address,
      intro: data.reason,
      url: data.site,
      hospital_picture: data.images,
    }),
  );
};
