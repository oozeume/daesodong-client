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
    url: `admin/hospitals?${_query}`,
  });
};

export const useGetFacilityList = (
  query: GetFacilityListQuery,
  enabled: boolean,
) => {
  return useInfiniteQuery(
    [QueryKeys.facility.facilityList],
    () => {
      return getFacilityList(query);
    },
    {
      enabled: enabled,
    },
  );
};

/**
 *@description 카카오 좌표 -> 주소 정보 API
 */

export const getLocation = (location: {
  latitude: number;
  longitude: number;
}) => {
  const {latitude, longitude} = location;
  return axios.get(
    // NOTE : x : longitude, y : latitude
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
    {
      headers: {
        // TODO: env정보에 저장으로 변경
        Authorization: `KakaoAK ${config.KAKAO_TOKEN}`,
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
