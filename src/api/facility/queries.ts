import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import _ from 'lodash';
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
  cursor?: string;
};

const getFacilityReviews = ({
  facilityId,
  limit,
  cursor,
}: GetFacilityReviewsQuery | any) => {
  return apiCall<FacilityReviewsResponse[]>({
    method: 'GET',
    url: _.isNil(cursor)
      ? `/hospitals/${facilityId}/reviews?limit=${limit}`
      : `/hospitals/${facilityId}/reviews?limit=${limit}&cursor=${cursor}`,
  });
};

export const useGetFacilityReviews = ({
  facilityId,
  limit,
}: GetFacilityReviewsQuery) => {
  return useInfiniteQuery(
    [QueryKeys.facility.reviews],
    param => {
      const cursor = param.pageParam?.cursor ?? undefined;

      return getFacilityReviews({facilityId, limit, cursor});
    },
    {
      getNextPageParam: lastPage => {
        const lastDataLength = lastPage.data.length;
        return {
          limit: limit,
          cursor:
            lastDataLength === 0
              ? undefined
              : lastPage.data[lastDataLength - 1].id,
        };
      },
      keepPreviousData: true,
    },
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
