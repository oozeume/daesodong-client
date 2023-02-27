import dayjs from 'dayjs';

// 시설 상세 페이지 양쪽 여백
export const MARGIN_X = 18;

// 시설 리뷰 폼 초기값 상수
export const INIT_REVIEW_FORM = {
  visit_date: `${dayjs().year()}-${dayjs().month()}`,
  cost: 0,
  thoughts: '',
  score_treatment: 0,
  score_price: 0,
  score_facilities: 0,
  score_kindness: 0,
  expect_revisit: false,
  already_reviesit: false,
  hospital_review_picture: ['aaa,png', 'bbb.png'],
  tags: [''],
};
