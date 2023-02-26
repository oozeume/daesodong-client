import {useQuery} from '@tanstack/react-query';
import {
  FacilityResponse,
  FacilityReviewsResponse,
  VisitedFacilityResponse,
} from '~/../types/api/facility';
import {SpeciesType} from '~/../types/api/species';
import {apiCall} from '~/api/common';
import QueryKeys from '~/constants/queryKeys';

/**
 *@description 시설 정보 API
 */

const getFacilityInfo = (id: string) => {
  return apiCall<FacilityResponse>({
    method: 'GET',
    url: `/hospitals/${id}`,
  });
};

export const useGetFacilityInfo = (id: string) => {
  return useQuery([QueryKeys.facility.info, id], () => getFacilityInfo(id));
};

/**
 *@description 시설 방문 API
 */

const getVisitedFacility = (id: string) => {
  return apiCall<VisitedFacilityResponse>({
    method: 'GET',
    url: `/hospitals/${id}/visits`,
  });
};

export const useGetVisitedFacility = (id: string) => {
  return useQuery([QueryKeys.facility.visitedUser], () =>
    getVisitedFacility(id),
  );
};

/**
 *@description 시설 방문한 동물 리스트 API
 */

const getVisitedPetsFacility = (facilityId: string) => {
  return apiCall<SpeciesType[]>({
    method: 'GET',
    url: `/hospitals/${facilityId}/visits/species`,
  });
};

export const useGetVisitedPetsFacility = (facilityId: string) => {
  return useQuery([QueryKeys.facility.visitedPets], () =>
    getVisitedPetsFacility(facilityId),
  );
};

/**
 *@description 시설 리뷰 리스트 API
 */

type GetFacilityReviewsQuery = {
  facilityId: string;
  limit: number;
};

const getFacilityReviews = ({facilityId, limit}: GetFacilityReviewsQuery) => {
  return apiCall<FacilityReviewsResponse[]>({
    method: 'GET',
    url: `/hospitals/${facilityId}/reviews?limit=${limit}`,
  });
};

export const useGetFacilityReviews = ({
  facilityId,
  limit,
}: GetFacilityReviewsQuery) => {
  return useQuery([QueryKeys.facility.reviews], () =>
    getFacilityReviews({facilityId, limit}),
  );
};

/**
 *@description 시설 평점 API
 */

type FacilityScoreResponse = {
  score_facilities: number;
  score_kindness: number;
  score_price: number;
  score_treatment: number;
  score_total: number;
};

const getFacilityScore = (id: string) => {
  return apiCall<FacilityScoreResponse>({
    method: 'GET',
    url: `/hospitals/${id}/scores`,
  });
};

export const useGetFacilityScore = (id: string) => {
  return useQuery([QueryKeys.facility.score], () => getFacilityScore(id));
};
