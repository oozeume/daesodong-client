import { useQuery } from "@tanstack/react-query"
import { FacilityType } from "~/../types/api/facility"
import { SpeciesType } from "~/../types/api/species"
import { apiCall } from "~/api/common"
import QueryKeys from "~/constants/queryKeys"

const GET_FACILITY_INFO = (id: string) => {
  return apiCall<FacilityType>({
    method: 'GET',
    url: `/hospitals/${id}`,
  })
}

export const useGetFacilityInfo = (id: string) => {
  return useQuery([QueryKeys.Facility.Info, id], () => GET_FACILITY_INFO(id))
}

const GET_FACILITY_VISIT = (id: string) => {
  return apiCall<any>({
    method: 'GET',
    url: `/hospitals/${id}/visits`
  })
}

export const useGetVisitedFacility = (id: string) => {
  return useQuery([QueryKeys.Facility.VisitedUser], () => GET_FACILITY_VISIT(id))
}

const GET_FACILITY_VISIT_PETS = (facilityId: string) => {
  return apiCall<SpeciesType[]>({
    method: 'GET',
    url: `/hospitals/${facilityId}/visits/species`
  })
}

export const useGetVisitedPetsFacility = (facilityId: string) => {
  return useQuery([QueryKeys.Facility.VisitedPets], () => GET_FACILITY_VISIT_PETS(facilityId))
}