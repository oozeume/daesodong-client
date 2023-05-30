import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import queryString from 'query-string';
import {
  FacilityListResponse,
  FacilityResponse,
  FacilityReviewsResponse,
  GetFacilityListQuery,
  VisitedFacilityResponse,
} from '~/../types/api/facility';
import {SpeciesType} from '~/../types/api/species';
import {apiCall} from '~/api/common';
import QueryKeys from '~/constants/queryKeys';
import {config} from '~/utils/config';

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
  same: boolean;
};

const getFacilityReviews = ({
  facilityId,
  limit,
  cursor,
  same,
}: GetFacilityReviewsQuery) => {
  const _query = queryString.stringify({limit, cursor, same});

  return apiCall<FacilityReviewsResponse[]>({
    method: 'GET',
    url: `/hospitals/${facilityId}/reviews?${_query}`,
  });
};

export const useGetFacilityReviews = ({
  facilityId,
  limit,
  same,
}: GetFacilityReviewsQuery) => {
  return useInfiniteQuery(
    [QueryKeys.facility.reviews],
    param => {
      const cursor = param.pageParam?.cursor ?? undefined;

      return getFacilityReviews({facilityId, limit, cursor, same});
    },
    {
      getNextPageParam: (lastPage, allpages) => {
        const allPagesDataLength = allpages[0].data.length;
        const lastDataLength = lastPage.data.length;

        if (allPagesDataLength < limit) {
          return false;
        } else {
          return {
            limit: limit,
            cursor:
              lastDataLength === 0
                ? undefined
                : lastPage.data[lastDataLength - 1].id,
          };
        }
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

/**
 *@description 시설 리스트 API
 */

const getFacilityList = (query: GetFacilityListQuery) => {
  const _query = queryString.stringify(query);
  return apiCall<FacilityListResponse>({
    method: 'GET',
    url: `/hospitals?${_query}`,
  });
};

export const useGetFacilityList = (
  query: GetFacilityListQuery,
  enabled: boolean,
) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.facility.facilityList],
    queryFn: ({pageParam = 0}) => {
      return getFacilityList({
        ...query,
        page: pageParam,
      });
    },
    enabled: enabled,
    getNextPageParam: currentPage => {
      if (
        currentPage.data.meta.currentPage < currentPage.data.meta.totalPages
      ) {
        return currentPage.data.meta.currentPage + 1;
      } else {
        return null;
      }
    },
    keepPreviousData: true,
  });
};

/**
 *@description 네이버 좌표 -> 주소 API
 */

export const getLocation = (location: {
  latitude: number;
  longitude: number;
}) => {
  const {latitude, longitude} = location;
  return axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': config.NAVER_CLIENT_KEY,
        'X-NCP-APIGW-API-KEY': config.NAVER_SECRET_CLIENT_KEY,
      },
    },
  );
};

export const useGetLocation = (
  location: {
    latitude: number;
    longitude: number;
  },
  enabled: boolean,
) => {
  return useQuery(
    [QueryKeys.facility.location],
    () => {
      return getLocation(location);
    },
    {
      enabled,
    },
  );
};

/**
 *@description 네이버 주소 -> 좌표 API
 */

export const getCoordinate = (location: string) => {
  return axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${location}`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': config.NAVER_CLIENT_KEY,
        'X-NCP-APIGW-API-KEY': config.NAVER_SECRET_CLIENT_KEY,
      },
    },
  );
};

export const useCoordinate = (location: string) => {
  return useQuery({
    queryKey: [QueryKeys.facility.coordinate],
    queryFn: () => {
      return getCoordinate(location);
    },
  });
};
