import {Stack} from 'native-base';
import React, {useState} from 'react';
import LayoutContainer from './LayoutContainer';
import ChoiceButton from './ChoiceButton';
import _ from 'lodash';

type PetOwnerGenderType = '여성' | '남성' | undefined;

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 집사 성별
 */

function ChoiceGender({handlePage}: Props) {
  const [selectGender, setSelectGender] = useState<PetOwnerGenderType>();

  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(selectGender)}>
      <Stack space={'10px'}>
        <ChoiceButton
          buttonName={'여성'}
          onPress={() => setSelectGender('여성')}
          active={selectGender === '여성'}
        />

        <ChoiceButton
          buttonName={'남성'}
          onPress={() => setSelectGender('남성')}
          active={selectGender === '남성'}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default ChoiceGender;
