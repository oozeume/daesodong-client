import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';

/**
 *@description 보고싶은 컨텐츠 생성 api
 */

const postRequestContents = (data: string) => {
  return apiCall({
    method: 'POST',
    url: '/content/request/user',
    data: {
      recommend: data,
    },
  });
};

export const useRequestContents = (data: string) => {
  return useMutation(() => postRequestContents(data));
};
