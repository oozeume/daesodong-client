import dayjs from 'dayjs';

/**
 *@description DateSelector의 itemList 세팅 함수 (년도별)
 *@param refYear (필수) 기준 년도
 */

export const setYears = (refYear: number) => {
  const curYear = dayjs().year();
  let yearList = [];

  for (let i = curYear; i >= refYear; i--) {
    yearList.push({value: i, txt: `${i}년`});
  }

  return yearList;
};

/**
 *@description DateSelector의 itemList 세팅 함수 (월별)
 */

export const setMonths = () => {
  let monthList = [];

  for (let i = 1; i < 13; i++) {
    monthList.push({value: i, txt: `${i}월`});
  }

  return monthList;
};
