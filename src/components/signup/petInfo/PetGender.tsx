import React from 'react';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 성별
 */

function PetGender({handlePage}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <></>
    </LayoutContainer>
  );
}

export default PetGender;
