import {GenderType} from '../common';

// 마이페이지 - 저장 상단 탭
export const TABS = {
  ['Facility']: '시설',
  ['Contents']: '콘텐츠',
  ['Community']: '커뮤니티',
} as const;

/**
 *@description 내 정보 수정 폼
 */
export type MyInfoForm = {
  nickname: string;
  gender: GenderType;
  birthdate: number;
  address: string;
};
