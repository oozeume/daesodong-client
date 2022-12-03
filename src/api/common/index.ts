import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {ErrorResponse} from '~/../types/api/common';

// 임시 베이스 URL, 추후 env 파일 적용 시, development, production으로 나눌 예정
export const BASE_URL = 'http://127.0.0.1:3754/';

/**
 *@description api 공통 호출 모듈
 *@param props - axios 라이브러리 props (url, method, headers, baseURL ...)
 */
export const apiCall = <ResponseType = any>(props: AxiosRequestConfig) => {
  return axios({
    ...props,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...props.headers,
    },
    url: `${props.url}`,
    baseURL: BASE_URL,
  })
    .then(({data, status}: {data: ResponseType; status: number}) => ({
      data,
      statusCode: status,
      success: 'SUCCESS' as const,
    }))
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response?.data as ErrorResponse;
        return {
          message: data?.message,
          statusCode: data?.statusCode,
          success: 'FAIL' as const,
        };
      } else
        return {
          data: undefined,
          statusCode: error.response?.status,
          success: false,
        };
    });
};
