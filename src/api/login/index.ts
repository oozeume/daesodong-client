import {useMutation, useQuery} from '@tanstack/react-query';
// import { Post } from '../types/Post';

const BASE_URL = 'http://127.0.0.1:3754/';

const getAuthNickname = async (nickname: string): Promise<any> => {
  const res = await fetch(`${BASE_URL}auth/${nickname}`, {
    method: 'GET',
    headers: {accept: 'application/json'},
  })
    .then(response => response.json())
    .catch((Error: any) => Error);

  console.log(res);

  return res;
};

// 'Accept-Encoding': 'gzip, deflate'
const postAuthLogin = async (body: FormData): Promise<any> => {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: {accept: 'application/json'},
    body,
  })
    .then(response => response.json())
    .catch((Error: any) => Error);

  return res;
};

const postAuthSignup = async (body: any): Promise<any> => {
  const _body = new FormData();

  _body.append('nickname', 'test2');
  _body.append('email', 'test2@test.com');
  _body.append('mobile', 'test2');

  const res = await fetch(`${BASE_URL}auth/social/signup`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      // 'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
    body: _body,
  })
    .then(response => response.json())
    .catch((Error: any) => Error);

  console.log('@@@ RESULT');
  console.log(res);

  return res;
};

export const useGetAuthNickname = (nickname: string) => {
  return useQuery(['nickname', nickname], () => getAuthNickname(nickname));
};

export const usePostAuthLogin = () => {
  return useMutation((body: FormData) => postAuthLogin(body));
};

export const usePostAuthSignup = () => {
  return useMutation((body: any) => postAuthSignup(body));
};
