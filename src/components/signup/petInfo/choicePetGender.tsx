import _ from 'lodash';
import {Stack} from 'native-base';
import React, {useState} from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import ChoiceButton from './choiceButton';
import LayoutContainer from './layoutContainer';

interface Props {
  handlePage: () => void;
}

type PetGenderType = '여아' | '남아' | undefined;

/**
 *@description 집사정보등록 - 반려동물 성별
 */

function ChoicePetGender({handlePage}: Props) {
  const [selectGender, setSelectGender] = useState<PetGenderType>(undefined);

  return (
    <LayoutContainer>
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
      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active={!_.isNil(selectGender)}
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default ChoicePetGender;
