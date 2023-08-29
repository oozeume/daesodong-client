import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import _ from 'lodash';
import {ErrorResponse} from '~/../types/api/common';
import {config} from '~/utils/config';
import {getSecurityData} from '~/utils/storage';

// 임시 베이스 URL, 추후 env 파일 적용 시, development, production으로 나눌 예정
export const BASE_URL = config.BASE_URL;

const axiosInstance = axios.create();

/**
 *@description api 공통 호출 모듈
 *@param props - axios 라이브러리 props (url, method, headers, baseURL ...)
 */
export const apiCall = async <ResponseType = any>(
  props: AxiosRequestConfig,
) => {
  const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);
  const refreshToken = await getSecurityData(config.REFRESH_TOKEN_NAME);
  if (__DEV__) {
    console.log('@ API CALL PREVIOUS @');
    console.log(`0. accessToken : ${accessToken}`);
    console.log(`1. refreshToken : ${refreshToken}`);
    console.log(`2. METHOD : ${props.method}`);
    console.log(`3. PATH : ${BASE_URL}${props.url}`);
    console.log(`4. DATA: ${JSON.stringify(props.data)}`);
    console.log('');
  }

  return axiosInstance({
    ...props,
    headers: {
      Accept: 'application/json',
      ...props.headers,
      Authorization: 'Bearer ' + `${accessToken}`,
    },
    url: `${props.url}`,
    baseURL: BASE_URL,
  })
    .then(({data, status}: {data: ResponseType; status: number}) => {
      if (__DEV__) {
        console.log('@ API SUCCESS RESPONSE @');
        console.log(`1. METHOD : ${props.method}`);
        console.log(`2. PATH : ${BASE_URL}${props.url}`);
        console.log(`3. DATA : `);
        console.log(data);
      }

      return {
        data,
        statusCode: status,
        success: 'SUCCESS' as const,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response?.data as ErrorResponse;

        if (__DEV__) {
          console.log('@ API ERROR RESPONSE @');
          console.log(data);
        }

        throw {
          message: data?.message || '',
          statusCode: data?.statusCode || 500,
          success: 'FAIL' as const,
        };
      } else
        throw {
          data: undefined,
          statusCode: error.response?.status,
          success: false,
        };
    });
};

/**
 *@description api 요청 후, 일정시간 응답이 없을 경우, 요청 캔슬
 *@param time - api 요청 후, 응답이 안올때까지 기다리는 시간
 */
const apiTimeout = (time: number) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller.signal;
};

/**
 *@description fetch용 api 파일 업로드 호출 모듈 (axios 측 업로드가 서버측으로 undefined 값만 보내서 대체용)
 */
export const imageApiCall = async <ResponseType = any>(props: {
  url: string;
  data: FormData;
  timeout?: number;
}) => {
  const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);
  if (__DEV__) {
    console.log('@ API CALL PREVIOUS @');
    console.log(`accessToken : ${accessToken}`);
    console.log(`path : ${BASE_URL}${props.url}`);
    console.log('');
  }

  return fetch(`${BASE_URL}${props.url}`, {
    method: 'POST',
    body: props.data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: apiTimeout(props.timeout ?? 3),
  })
    .then(async response => {
      if (response.ok) {
        const data = (await response.json()) as ResponseType;
        if (__DEV__) {
          console.log('@ API SUCCESS RESPONSE @');
          console.log(data);
        }

        return {
          data: {},
          statusCode: response.status,
          success: 'SUCCESS' as const,
        };
      } else {
        const errorMessage = await response.text();
        throw {
          message: errorMessage,
          statusCode: response.status,
        };
      }
    })
    .catch((error: {message: string; statusCode: number}) => {
      if (_.isUndefined(error.statusCode)) {
        // 단순 코드 오류
        throw {
          message: '문제가 발생했습니다. 계속 안된다면 관리자에게 문의하세요.',
          statusCode: 400,
          success: 'FAIL',
        };
      } else if (error.statusCode === 413) {
        throw {
          message: '업로드하는 파일 용량이 너무 큽니다.',
          statusCode: 413,
          success: 'FAIL',
        };
      } else if (Math.floor(error.statusCode / 400) === 1) {
        // body 문제
        throw {
          message: '잘못된 요청입니다. 다시 시도해주세요.',
          statusCode: error.statusCode,
          success: 'FAIL',
        };
      } else {
        throw {
          message: '사진을 업로드하는 과정에서 문제가 발생했습니다.',
          statusCode: error.statusCode,
          success: 'FAIL',
        };
      }
    });
};
