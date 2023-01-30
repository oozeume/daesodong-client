import {useQuery} from '@tanstack/react-query';
import {apiCall} from '../common';
import {GetAuthMobileResponse} from '~/../types/api/user';
import QueryKeys from '~/constants/queryKeys';
import _ from 'lodash';

/**
 *@description 번호를 통한 아이디 찾기 api
 *@param {string} mobile - 핸드폰 번호
 */
const getAuthMobile = async (mobile: string) => {
  return apiCall<GetAuthMobileResponse>({
    method: 'GET',
    url: `auth/mobile/${mobile}`,
  });
};

/**
 *@description 전화 번호 인증 코드 발송 api hook
 */
export const useGetAuthMobile = (mobile?: string) => {
  return useQuery(
    [QueryKeys.auth.getAuthMobile, mobile],
    ({queryKey}) => {
      const _mobile = queryKey[1] as string;
      return getAuthMobile(_mobile);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !_.isUndefined(mobile),
    },
  );
};
