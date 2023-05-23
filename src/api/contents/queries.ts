import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import queryString from 'query-string';
import {ContentsResponse} from '~/../types/api/contents';
import QueryKeys from '~/constants/queryKeys';
import {apiCall} from '../common';

interface queryType {
  skip: number;
  take: number;
}

/**
 *@description 컨텐츠 리스트 API
 */

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

/**
 *@description 컨텐츠 상세 API
 */

const getContentDetail = (id: string) => {
  return apiCall<ContentsResponse>({
    method: 'GET',
    url: `/content/search/one?contentId=${id}`,
  });
};

export const useGetContentDetail = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.contents.content],
    queryFn: () => {
      return getContentDetail(id);
    },
    onError: e => console.log(e),
  });
};
