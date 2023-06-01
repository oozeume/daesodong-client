/**
 *@description 시설 상세 API 응답
 */
export type FacilityResponse = {
  id: string;
  hospitalCategoryId?: string;
  name: string;
  phone: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
  thanks: number;
  visitCount: number;
  review_count: number;
  intro: string;
  url: string;
  info: string;
  bookmarks: number;
  save_hospital: {
    hospitalId: string;
    userId: string;
  }[];
  sch_mon: string;
  sch_tue: string;
  sch_wed: string;
  sch_thu: string;
  sch_fri: string;
  sch_sat: string;
  sch_sun: string;
  sch_holy: string;
  expose: boolean;
  score_total: number;
  created_at: string;
  updated_at: string;
  hospital_category: {
    id: string;
    name: string;
  };
  hospital_picture: {
    hospitalId: string;
    picture_url: string;
  }[];
  _count: {
    hospital_user_visit: number;
    hospital_review: number;
  };
};

/**
 *@description 시설 방문 기록 API 응답
 */
export type VisitedFacilityResponse = {
  created_at: string;
  hospitalId: string;
  pet: {
    age: number;
    concern: string;
    created_at: string;
    id: string;
    name: string;
    pet_picture_url: string;
    sex: string;
    specieId: string;
    updated_at: string;
    userId: string;
  };
  petId: string;
  userId: string;
};

/**
 *@description 시설 리뷰작성 API 폼
 */
export type PostFacilityReviewData = {
  visit_date: string;
  cost: number;
  thoughts: string;
  score_treatment: number;
  score_price: number;
  score_facilities: number;
  score_kindness: number;
  expect_revisit: boolean;
  already_reviesit: boolean;
  hospital_review_picture?: string[];
  tags: string[];
};

// TODO: api 수정 요청 - 리뷰 이미지 추가 필요 (수정 대기중)
/**
 *@description 병원 리뷰 API 응답
 */
export type FacilityReviewImage = {
  hospital_reviewId: string;
  id: string;
  picture_url: string;
};

export type FacilityReviewsResponse = {
  id: string;
  hospitalId: string;
  userId: string;
  petId: string;
  visit_date: string;
  cost: number;
  thoughts: string;
  score_treatment: number;
  score_price: number;
  score_facilities: number;
  score_kindness: number;
  expect_revisit: boolean;
  already_reviesit: boolean;
  created_at: string;
  updated_at: string;
  user: {
    nickname: string;
  };
  pet: {
    id: string;
    userId: string;
    name: string;
    age: number;
    sex: string;
    specieId: string;
    concern: string;
    pet_picture_url: string;
    created_at: string;
    updated_at: string;
    specie: {
      id: string;
      name: string;
      confirm: true;
      kindId: string;
      created_at: string;
    };
  };
  tags: {
    hospital_review_tags: {
      id: string;
      name: string;
    };
  }[];
  thanks: number;
  thanks_review_join: {
    hospitalReviewId: string;
    userId: string;
  }[];
  hospital_review_picture?: FacilityReviewImage[];
};

/**
 *@description 병원 방문 API 응답
 */
export type PostVisitedFacilityResponse = {
  data: boolean;
  statusCode: number;
  success: string;
};

/**
 *@description 병원 리뷰 스코어 API 응답
 */
export type FacilityScoreResponse = {
  score_facilities: number;
  score_kindness: number;
  score_price: number;
  score_treatment: number;
  score_total: number;
};

/**
 *@description 병원 리스트 API 응답
 */

// TODO : 적절한 타입으로 변경
export type FacilityListResponse = any;

export type FacilityListType = {
  id: string;
  hospitalCategoryId?: string;
  name: string;
  phone: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
  thanks: number;
  bookmarks: number;
  visitCount: number;
  review_count: number;
  intro: string;
  url: string;
  info: string;
  sch_mon: string;
  sch_tue: string;
  sch_wed: string;
  sch_thu: string;
  sch_fri: string;
  sch_sat: string;
  sch_sun: string;
  sch_holy: string;
  expose: boolean;
  score_total: number;
  created_at: string;
  updated_at: string;
  hospital_picture?: {
    id?: string;
    name?: string;
  }[];
  score_avg?: number;
};

// 시설 리스트 쿼리
export interface GetFacilityListQuery {
  limit: number;
  expose: boolean;
  sort: FacilitySortBy;
  page?: number;
  search?: number;
  category?: string;
  state?: string;
  city?: string;
  species?: string;
  lat?: number;
  lng?: number;
}

export const FacilitySortType = {
  distances: '거리 순',
  reviews: '리뷰 많은 순',
  stars: '별점 높은 순',
} as const;

export const FacilityType = {
  all: '모든 시설',
  hospital: '병원',
} as const;

type FacilitySortBy = keyof typeof FacilitySortType;
type FacilityTypeBy = keyof typeof FacilityType;

export type FilterTypes = FacilitySortBy | FacilityTypeBy;

export interface MyReportResponse {
  whoIRepoert: MyReport[];
}

export interface MyReport {
  check_admin: boolean;
  created_at: string;
  id: number;
  reason: string;
  reportUserId: string;
  suspectUserId: string;
  updated_at: string;
}

export type PostReportData = {suspectUserId: string; reason: string};
