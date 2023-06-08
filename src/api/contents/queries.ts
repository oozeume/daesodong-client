/**
 *@description 컨텐츠 리스트 API
 */

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import queryString from 'query-string';
import {GetContentsResponse} from '~/../types/api/contents';
import {ContetnsQueryType} from '~/../types/contents';
import {CONTENTS_PER_PAGE} from '~/constants/contents';
import QueryKeys from '~/constants/queryKeys';
import {apiCall} from '../common';

const getContents = (query: ContetnsQueryType) => {
  const qs = queryString.stringifyUrl({
    url: '/content',
    query: {...query},
  });
  return apiCall<GetContentsResponse[]>({
    method: 'GET',
    url: qs,
  });
};

export const useGetContents = (currentPage: number) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.contents.contents],
    queryFn: ({pageParam = 0}) => {
      return getContents({
        skip: pageParam * CONTENTS_PER_PAGE,
        take: CONTENTS_PER_PAGE,
      });
    },
    getNextPageParam: lastPage => {
      if (lastPage.data.length < CONTENTS_PER_PAGE) {
        return null;
      } else {
        return currentPage;
      }
    },
    keepPreviousData: true,
  });
};

export const useGetMainContents = (query: ContetnsQueryType) => {
  return useQuery({
    queryKey: [QueryKeys.contents.mainContents],
    queryFn: () => {
      return getContents(query);
    },
  });
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
