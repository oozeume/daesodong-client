import React from 'react';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 주소
 */

function Address({handlePage}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <></>
    </LayoutContainer>
  );
}

export default Address;
