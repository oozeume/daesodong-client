import { useMutation } from "@tanstack/react-query"
import { apiCall } from "~/api/common"

const MUTATION_FACILITY_VISIT = (id: string) => {
    return apiCall<any>({
        method: 'POST',
        url: `/hospitals/${id}/visits`
    })
}

export const useMutationVisitedFacility = () => {
    return useMutation((id: string) => MUTATION_FACILITY_VISIT(id))
}