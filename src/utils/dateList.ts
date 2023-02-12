import dayjs from 'dayjs';

export const setYears = () => {
  const curYear = dayjs().year();
  const refYear = 2015;
  let yearList = [];

  for (let i = curYear; i >= refYear; i--) {
    yearList.push({value: i, txt: `${i}년`});
  }

  return yearList;
};

export const setMonths = () => {
  let monthList = [];

  for (let i = 1; i < 13; i++) {
    monthList.push({value: i, txt: `${i}월`});
  }

  return monthList;
};
