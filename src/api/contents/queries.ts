/**
 *@description 컨텐츠 리스트 API
 */

import {useInfiniteQuery} from '@tanstack/react-query';
import queryString from 'query-string';
import {ContentsResponse} from '~/../types/api/contents';
import {apiCall} from '../common';

interface queryType {
  skip: number;
  take: number;
}

const getContents = (query: queryType) => {
  const qs = queryString.stringifyUrl({
    url: '/content',
    query: {...query},
  });
  return apiCall<ContentsResponse>({
    method: 'GET',
    url: qs,
  });
};

export const useGetContents = (query: queryType) => {
  return useInfiniteQuery(['contents'], () => getContents(query));
};
