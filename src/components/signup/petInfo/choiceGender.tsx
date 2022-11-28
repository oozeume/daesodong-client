import {Stack} from 'native-base';
import React, {useState} from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';
import _ from 'lodash';
import ChoiceButton from './choiceButton';

type PetSitterGenderType = '여성' | '남성' | undefined;

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 집사 성별
 */

function ChoiceGender({handlePage}: Props) {
  const [selectGender, setSelectGender] = useState<PetSitterGenderType>();

  return (
    <LayoutContainer>
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

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          shadow
          active={!_.isNil(selectGender)}
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

export default ChoiceGender;
