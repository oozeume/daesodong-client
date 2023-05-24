import {FacilitySortBy} from '../api/facility';

export interface FormState {
  facility?: string;
  animal?: string;
  sortType: FacilitySortBy;
}

// 시설 리뷰 페이지 공통 파라미터
export interface FacilityReviewParams {
  id: string;
  facilityName: string;
}

// 시설 리뷰 스코어
export type RateName =
  | 'score_treatment'
  | 'score_price'
  | 'score_facilities'
  | 'score_kindness';

// 리뷰 작성/수정인지 확인하는 타입
export const enum ReviewType {
  Register = 'register',
  Edit = 'edit',
}

export type LocationInfoType = {
  sido: {
    name: string;
    sido: string;
  };
  sigugun: {
    name: string;
    sigugun: string;
  };
};

export type CoordinateType = {
  latitude: number;
  longitude: number;
};
