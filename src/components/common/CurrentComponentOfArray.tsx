import React from 'react';
import {isArray} from 'lodash';

interface Props {
  children: JSX.Element[] | JSX.Element;
  index: number;
}

/**
 *@description 자식 요소의 컴포넌트를 배열로 받아서 현재 인덱스의 컴포넌트만 리턴하는 컴포넌트
 */

function CurrentComponentOfArray({children, index}: Props) {
  const isArrayElements = isArray(children);

  return <>{isArrayElements ? children[index - 1] : children}</>;
}

export default CurrentComponentOfArray;
