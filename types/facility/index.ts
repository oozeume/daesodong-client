export interface FormState {
  facility?: string;
  animal?: string;
  sortType?: string;
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
