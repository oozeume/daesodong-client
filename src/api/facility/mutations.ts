import { useMutation } from "@tanstack/react-query"
import { apiCall } from "~/api/common"

/**
 *@description 병원 방문 API
 */

const mutationVisitedFacility = (id: string) => {
    return apiCall<any>({
        method: 'POST',
        url: `/hospitals/${id}/visits`
    })
}

export const useMutationVisitedFacility = () => {
    return useMutation((id: string) => mutationVisitedFacility(id))
}