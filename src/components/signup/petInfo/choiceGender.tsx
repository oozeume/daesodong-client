import React from 'react';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 집사 성별
 */

function ChoiceGender({handlePage}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <></>
    </LayoutContainer>
  );
}

export default ChoiceGender;
