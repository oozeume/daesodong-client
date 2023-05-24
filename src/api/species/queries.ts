import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import queryString from 'query-string';
import {GetSpeciesQuery, GetSpeciesResponse} from '~/../types/api/species';

/**
 *@description 동물 종 리스트 조회 api
 */
const getSpecies = (query: GetSpeciesQuery) => {
  const _query = queryString.stringify(query);

  return apiCall<GetSpeciesResponse>({
    method: 'GET',
    url: `species?${_query}`,
  });
};

/**
 *@description 동물 종 리스트 조회 api hook
 */
export const useGetSpecies = (query: GetSpeciesQuery, enabled?: boolean) => {
  return useQuery(
    ['get-species', query],
    ({queryKey}) => {
      const _query = queryKey[1] as GetSpeciesQuery;
      return getSpecies(_query);
    },
    {
      enabled,
    },
  );
};
