import React from 'react';
import {Text} from 'native-base';

import styles from '../hospital/info/styles';

type TextAlignType =
  | 'center'
  | 'auto'
  | 'left'
  | 'right'
  | 'justify'
  | undefined;

type TextEllipsisProps = {
  text: string;
  width: number;
  textAlign: TextAlignType;
  numberOfLines: number;
};

/**
 * 글자 생략 및 펼치기 기능을 수행하는 공통 컴포넌트
 * @param {string} text 글자 생략이 필요한 텍스트
 * @param {number} width 글자가 표시되는 Block의 가로 길이
 * @param {string} textAlign 글자 정렬 기준
 * @param {number} numberOfLines 텍스트가 표시될 줄(세로) 길이, 펼치기 할 경우 0
 */

const TextEllipsis = ({
  text,
  width,
  textAlign,
  numberOfLines,
}: TextEllipsisProps) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.text, {width, textAlign}]}>
      {text}
    </Text>
  );
};

export default TextEllipsis;
