import _ from 'lodash';
import {Stack} from 'native-base';
import React, {useState} from 'react';
import ChoiceButton from './ChoiceButton';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
}

type PetGenderType = '여아' | '남아' | undefined;

/**
 *@description 집사정보등록 - 반려동물 성별
 */

function ChoicePetGender({handlePage}: Props) {
  const [selectGender, setSelectGender] = useState<PetGenderType>();

  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(selectGender)}>
      <Stack space={'10px'}>
        <ChoiceButton
          buttonName={'여아'}
          onPress={() => setSelectGender('여아')}
          active={selectGender === '여아'}
        />

        <ChoiceButton
          buttonName={'남아'}
          onPress={() => setSelectGender('남아')}
          active={selectGender === '남아'}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default ChoicePetGender;
