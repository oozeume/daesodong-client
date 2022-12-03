import {Stack} from 'native-base';
import React, {useState} from 'react';
import ChoiceButton from './ChoiceButton-1';
import LayoutContainer from './LayoutContainer-1';

interface Props {
  handlePage: () => void;
}

type PetGenderType = '여아' | '남아' | undefined;

/**
 *@description 집사정보등록 - 반려동물 성별
 */

function PetGender({handlePage}: Props) {
  const [selectGender, setSelectGender] = useState<PetGenderType>(undefined);
  return (
    <LayoutContainer buttonPress={handlePage}>
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

export default PetGender;
