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

/**
 *@description 컨텐츠 도움 유무 api
 */

interface HelpfulType {
  isHelp: boolean;
  reason: string;
}

const postHelpfulContents = (id: string, data: HelpfulType) => {
  return apiCall({
    method: 'POST',
    url: `/content/check/help${id}`,
    data: {
      it_help: data.isHelp,
      it_doesnt_help: !data.isHelp,
      reason: data.reason,
    },
  });
};

export const useReactedContents = (id: string) => {
  return useMutation({
    mutationFn: (data: HelpfulType) => {
      return postHelpfulContents(id, data);
    },
  });
};

/**
 *@description 컨텐츠 도움 취소 api
 */

const deleteReactedContents = (id: string, isHelp: boolean) => {
  return apiCall({
    method: 'DELETE',
    url: `content/check/${isHelp ? 'help' : 'doesnt_help'}/cancel${id}`,
  });
};

export const useDeleteReactedContents = (id: string) => {
  return useMutation({
    mutationFn: (isHelp: boolean) => {
      return deleteReactedContents(id, isHelp);
    },
  });
};

/**
 *@description 컨텐츠 북마크 추가 api
 */

const bookmarkContents = (contentId: string) => {
  return apiCall({
    method: 'GET',
    url: `/content/bookmark/add${contentId}`,
  });
};

export const useBookmarkContents = (contentId: string) => {
  return useMutation({
    mutationFn: () => {
      return bookmarkContents(contentId);
    },
  });
};

/**
 *@description 컨텐츠 북마크 취소 api
 */

const cancelBookmarkContents = (contentId: string) => {
  return apiCall({
    method: 'DELETE',
    url: `/content/bookmark/delete${contentId}`,
  });
};

export const useCancelBookmarkContents = (contentId: string) => {
  return useMutation({
    mutationFn: () => {
      return cancelBookmarkContents(contentId);
    },
  });
};
