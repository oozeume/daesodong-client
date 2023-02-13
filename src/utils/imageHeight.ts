// 이미지 비율에 맞게 높이 구하는 함수
export const imageHeight = (ratio: number, width: number) => {
  const _ratio = Math.round(ratio * 100);
  const heightRatio = width / _ratio;
  return Math.round(heightRatio * 100);
};