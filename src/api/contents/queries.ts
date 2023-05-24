/**
 *@description 컨텐츠 리스트 API
 */

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import queryString from 'query-string';
import {ContentsResponse} from '~/../types/api/contents';
import {CONTENTS_PER_PAGE} from '~/constants/contents';
import QueryKeys from '~/constants/queryKeys';
import {apiCall} from '../common';

interface ContetnsQueryType {
  skip: number;
  take: number;
}

const getContents = (query: ContetnsQueryType) => {
  const qs = queryString.stringifyUrl({
    url: '/content',
    query: {...query},
  });
  return apiCall<ContentsResponse[]>({
    method: 'GET',
    url: qs,
  });
};

export const useGetContents = () => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.contents.contents],
    queryFn: ({pageParam = 0}) => {
      return getContents({skip: pageParam, take: CONTENTS_PER_PAGE});
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < CONTENTS_PER_PAGE) {
        return null;
      } else {
        return allPages[0].data.length;
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
