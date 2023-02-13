import {useQuery} from '@tanstack/react-query';
import {
  FacilityResponse,
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
