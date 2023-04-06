export interface FilterSelectorType {
  text: string;
  disabled?: boolean;
}

// 시설 메인 > 페이지별 시설 개수
export const FACILITY_PER_PAGE = 10;

// 시설 메인 지도 필터 > 시설 유형 선택 리스트
export const FACILITY_TYPE_LIST = [
  {
    text: '모든 시설',
    disabled: false,
  },
  {
    text: '분양(준비 중)',
    disabled: true,
  },
  {
    text: '병원',
    disabled: false,
  },
  {
    text: '장례(준비 중)',
    disabled: true,
  },
];

export const FACILITY_SORT_TYPE = [
  {text: '거리순'},
  {text: '후기 많은 순'},
  {text: '별점 높은 순'},
];
