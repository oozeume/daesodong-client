import React from 'react';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 집사 태어난 년도
 */

function PetOwnerBirth({handlePage}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <></>
    </LayoutContainer>
  );
}

export default PetOwnerBirth;
